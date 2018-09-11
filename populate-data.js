const fsPromises = require('fs').promises;
const path = require('path');

const getLabUrls = require('./get-lab-urls');
const getLabInfo = require('./get-lab-info');

const populate = async () => {
  const labUrls = await getLabUrls();

  const labs = await Promise.all(labUrls.map(async (labUrl) => {
    return await getLabInfo(labUrl);
  }));

  await fsPromises.writeFile(path.join(__dirname, '/data/labs.json'), JSON.stringify(labs));
};

populate();
