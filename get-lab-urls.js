const cheerio = require('cheerio')

const get = require('./get');

const LIST_URL = 'https://www.karolinska.se/for-patienter/karolinska-universitetslaboratoriet/alla-provtagningsenheter-a-o/';

const getLabUrls = async () => {
  const html = await get(LIST_URL);
  const $ = cheerio.load(html)

  const labUrls = [];
  $('div.alphabetical-list > ul > li > a')
    .each((i, el) => {
      const $el = $(el);
      const href = $el.attr('href');
      const labUrl = new URL(href, LIST_URL);

      labUrls.push(labUrl.href);
    });

    return labUrls;
};

module.exports = getLabUrls;
