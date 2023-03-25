const axios = require('axios')
const cheerio = require('cheerio');
const e = require('express');

async function scrape(englishWordToTranslate) {
  const url = `https://diki.pl/slownik-angielskiego?q=${englishWordToTranslate}`

  try {
    // ? Get HTML of the website
    const response = await axios.get(url)
    const html = response.data

    // ? Load HTML to cheerio
    const $ = cheerio.load(html)

    const translations = forEveryPartOfSpeach($);
    return translations;
  } catch (error) {
    console.log(error)
  }
}


module.exports = scrape


function forEveryPartOfSpeach($) {
  return $('.foreignToNativeMeanings').map((_, element) => {
    return forEveryEntity($, element)
  }).get();
}

function forEveryExample($, element) {
  const examples = [];
  $(element).find('.exampleSentence').map((_, element) => {
    const example = $(element).text()
      .split(/\r?\n/) // rozdziel na przykład + tłumaczenie + szum
      .map(word => word.trim()) // usuń białe znaki z przykładu i tłumaczenia, zmień szum na puste stringi
      .filter(word => word);

    const eng = example[0];
    const pl = example[1];
    examples.push({ eng, pl })
  });
  return examples;
}

function getHeader($, element) {
  const headerArray = [];
  $(element).find('span.hw').map((_, element) => {
    headerArray.push($(element).text());
  });
  return headerArray.join(', ');
}

function forEveryEntity($, element) {
  const translationObject = $(element).find('li').map((_, element) => {
    return {
      translation: getHeader($, element),
      examples: forEveryExample($, element)
    }
  }).get();
  return translationObject;
}