const puppeteer = require('puppeteer');
const fs = require('node:fs')

async function wrapper(headless, words) {
  const translations = [];
  const browser = await puppeteer.launch({headless});

  await Promise.all(words.map(async (word)=>{
    const page = await browser.newPage();
    const translation = await getWord(word, page);
    translations.push(translation) 
  }))

  await browser.close();
  return {translations}
}

async function getWord(word, page) {
  console.log(word)
  await page.goto(`https://www.diki.pl/slownik-angielskiego?q=${word}`);
  // Wait for the results page to load and display the results.
  const resultsSelector = 'ol';
  await page.waitForSelector(resultsSelector);

  const translations = await page.evaluate((resultsSelector, word) => {
    return [...document.querySelectorAll('li')].map(anchor => {
      return {word: word, translation: anchor.querySelector('span.hw').textContent.trim(), examples:
              [...anchor.querySelectorAll('.exampleSentence')].map(sentence => {
                const [eng, pl] = sentence.textContent.split(/\r?\n/) // rozdziel na przykład + tłumaczenie + szum
                .map(word => word.trim()) // usuń białe znaki z przykładu i tłumaczenia, zmień szum na puste stringi
                .filter(word => word) // wywal puste stringi

                return {eng, pl}
              })
  }});
  }, resultsSelector);

  fs.writeFile( 'C:/Users/Adam/Desktop/translations.txt', JSON.stringify({translations: translations}), {encoding:'utf8'}, ()=>{});
  return translations;
}

(async function () {
  const x = await wrapper(true, ['heart', 'stone', 'leaf']);
  console.log(x)
}
)()

// (async function () {
//   let sexFile = '';
//   fs.readFile('C:/Users/Adam/Desktop/translations.txt', {encoding: 'utf-8'}, async (err, data)=> {
//     const x = await JSON.parse(data);
//     console.log(x.translations[0])
//   })
// })()
