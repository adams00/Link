import puppeteer from 'puppeteer';
import fs from 'node:fs'

const fileToWrite = new URL('orange.json', import.meta.url);

async function wrapper(headless) {
  const browser = await puppeteer.launch({headless});
  const page = await browser.newPage();
  await getWord('orange', page)
  await browser.close();
}

async function getWord(word, page) {
  await page.goto(`https://www.diki.pl/slownik-angielskiego?q=${word}`);


  // Wait for the results page to load and display the results.
  const resultsSelector = 'ol';
  await page.waitForSelector(resultsSelector);

  //Extract the results from the page.
  const links = await page.evaluate((resultsSelector) => {
    return [...document.querySelectorAll('li')].map(anchor => {
      return [anchor.querySelector('span.hw').textContent.trim(),
              [...anchor.querySelectorAll('.exampleSentence')].map(sentence => {
                return sentence.textContent.split(/\r?\n/) // rozdziel na przykład + tłumaczenie + szum
                .map(word => word.trim()) // usuń białe znaki z przykładu i tłumaczenia, zmień szum na puste stringi
                .filter(word => word) // wywal puste stringi
              })
    ]});
  }, resultsSelector);

  fs.writeFile(fileToWrite, JSON.stringify(links), {encoding:'utf8'}, ()=>{})
}

wrapper(true)

// (async (word) => {
//   const browser = await puppeteer.launch({headless:true});
//   const page = await browser.newPage();

//   await page.goto(`https://www.diki.pl/slownik-angielskiego?q=${word}`);


//   // Wait for the results page to load and display the results.
//   const resultsSelector = 'ol';
//   await page.waitForSelector(resultsSelector);

//   //Extract the results from the page.
//   const links = await page.evaluate((resultsSelector) => {
//     return [...document.querySelectorAll('li')].map(anchor => {
//       return [anchor.querySelector('span.hw').textContent.trim(),
//               [...anchor.querySelectorAll('.exampleSentence')].map(sentence => {
//                 return sentence.textContent.trim();
//               })
//     ]});
//   }, resultsSelector);

//   console.log(links)

//   await browser.close();
// })('pines');