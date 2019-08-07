const labsData = require('./data/labs');

labsData.forEach((lab) => {
  console.log(`${ lab.name }\t${ lab.latitude.replace(',', '.') }, ${ lab.longitude.replace(',', '.') }`);
});
