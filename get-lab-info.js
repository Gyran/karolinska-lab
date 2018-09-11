const cheerio = require('cheerio')
const get = require('./get');

const _getMetaTagContent = ($, name) => {
  return $(`meta[name="${ name }"]`).attr('content');
};

const _ensureHttps = (url) => {
  const httpsUrl = new URL(url);
  httpsUrl.protocol = 'https';

  return httpsUrl.href;
};

const getLabInfo = async (labUrl) => {
  const karolinskaHtml = await get(labUrl);
  const $karolinska = cheerio.load(karolinskaHtml)

  const vardguidenUrl = _ensureHttps($karolinska('#main > article > div.organization-info > div.organization-info__block.organization-info__location > a').attr('href'));

  console.log('labUrl', labUrl);
  console.log('vardguidenUrl', vardguidenUrl);

  const vardguidenHtml = await get(vardguidenUrl);
  const $vardguiden = cheerio.load(vardguidenHtml);

  return {
    name: _getMetaTagContent($vardguiden, 'hsa.name'),
    telephonenumber: _getMetaTagContent($vardguiden, 'hsa.telephonenumber'),
    visitingaddress: _getMetaTagContent($vardguiden, 'hsa.visitingaddress'),
    latitude: _getMetaTagContent($vardguiden, 'hsa.Latitude'),
    longitude: _getMetaTagContent($vardguiden, 'hsa.Longitude'),
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
