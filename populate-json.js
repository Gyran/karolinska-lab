const fsPromises = require('fs').promises;
const path = require('path');

const getLabUrls = require('./get-lab-urls');
const getLabInfo = require('./get-lab-info');

const populate = async () => {
  const labUrls = await getLabUrls();

  const labs = (await Promise.all(labUrls.map(async (labUrl) => {
    try {
      return await getLabInfo(labUrl);
    } catch (error) {
      return null;
    }
  }))).filter((lab) => lab);

  console.log(JSON.stringify(labs))
};

populate();
