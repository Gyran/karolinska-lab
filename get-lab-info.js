const cheerio = require('cheerio')
const got = require('got');

const _getMetaTagContent = ($, name) => {
  return $(`meta[property="${name}"]`).attr('content');
};

const _ensureHttps = (url) => {
  const httpsUrl = new URL(url);
  httpsUrl.protocol = 'https';

  return httpsUrl.href;
};

const getLabInfo = async (labUrl) => {
  const karolinskaHtml = (await got(labUrl)).body;
  const $karolinska = cheerio.load(karolinskaHtml)

  const vardguidenUrl = _ensureHttps($karolinska('#main > article > div.organization-info > div.organization-info__block.organization-info__location > a').attr('href'));

  const vardguidenHtml = (await got(vardguidenUrl)).body;
  const $vardguiden = cheerio.load(vardguidenHtml);

  return {
    name: _getMetaTagContent($vardguiden, 'hsa.name'),
    telephonenumber: $vardguiden('#hours > div > div > div.contact-card__content__inner.animation > div > div.main-info > div:nth-child(1) > div > a > span').text(),
    visitingaddress: _getMetaTagContent($vardguiden, 'hsa.visitingaddress'),
    latitude: _getMetaTagContent($vardguiden, 'hsa.latitude'),
    longitude: _getMetaTagContent($vardguiden, 'hsa.longitude'),
  };

  //
  //
  // const name = $('#main > article > h1').text();
  // const phoneNumber = $('#main > article > div.organization-info > div.organization-info__block.organization-info__time > p > a').text();
  // const address = $('#main > article > div.organization-info > div.organization-info__block.organization-info__location > p').text();
  //
  // return {
  //   name,
  //   phoneNumber,
  //   address,
  //   url: labUrl,
  // };
};

module.exports = getLabInfo;
