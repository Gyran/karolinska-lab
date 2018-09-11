const https = require('https');

const get = async (url) => {
  return new Promise((resovle, reject) => {
    let data = '';

    const request = https.get(url, (response) => {
      response.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      response.on('end', () => {
        resovle(data);
      });
    });
  });

  request.on('error', (error) => {
    reject(error);
  });
};

module.exports = get;
