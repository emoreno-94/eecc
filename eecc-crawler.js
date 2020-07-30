const cheerio = require('cheerio');
const got = require('got');
const urlJoin = require('url-join');
const xlsx = require('xlsx');
const rfr = require('rfr');
const parserSpeciesSheet = rfr('/parserSpeciesSheet');
const speciesModel = rfr('/models/species');
const validCategoryModel = rfr('/models/validCategory');
const regionModel = rfr('/models/region');
const bPromise = require('bluebird');
const fix = rfr('/lib/fix');
const cswCorrections = rfr('/lib/csw-corrections');

const MAIN_URL = 'http://www.mma.gob.cl/clasificacionespecies';
const URL_TO_PROCESS = urlJoin(MAIN_URL, 'listado-especies-nativas-segun-estado-2014.htm');


const getSpeciesXlsxUrl = async () => {
  const urlSelector = 'div#container > ul > li:nth-child(2) > a';

  const { body: page } = await got(URL_TO_PROCESS);
  const $ = cheerio.load(page);
  return urlJoin(MAIN_URL, $(urlSelector).attr('href'));
};

const getXlsx = async () => {
  const url = await getSpeciesXlsxUrl();
  const { body: xlsxSpecies } = await got(url, { responseType: 'buffer' });
  return xlsx.read(xlsxSpecies);
};

const parseXlsx = async () => {
  const insertCategories = (categories, speciesHash) => bPromise.map(
    categories,
    c => validCategoryModel.tryToInsert(validCategoryModel.getInstance({ shortName: c, speciesHash })),
    { concurrency: 1 },
  );

  const insertRegions = (regions, speciesHash) => bPromise.map(
    regions,
    r => regionModel.insert(regionModel.getInstance({ regionName: r.name, value: r.val, speciesHash })),
    { concurrency: 5 },
  );

  const saveSpecies = async speciesJson => {
    const species = speciesModel.getInstance(speciesJson.species);
    if (! fix.mustBeRemoved(species.scientist_name)) {
      const [ speciesHash ] = await speciesModel.upsert(species);
      await insertCategories(speciesJson.categories, speciesHash);
      await insertRegions(speciesJson.regions, speciesHash);
    }
  };

  console.log(`${ new Date().toISOString()}: Starting eecc crawler`);
  const xlsxToParse = await getXlsx();
  const speciesSheetName = xlsxToParse.SheetNames[1];
  const speciesSheet = xlsxToParse.Sheets[speciesSheetName];
  const allSpeciesJson = parserSpeciesSheet(speciesSheet);

  console.log('Updating species...');
  await validCategoryModel.removeAll();
  await regionModel.removeAll();
  await speciesModel.update({ to: { state: 'lost' } });
  await bPromise.map(allSpeciesJson, saveSpecies, { concurrency: 3 });

  await cswCorrections.runCorrections();

  console.log(`${ new Date().toISOString()}: Done!`);
};


(async () => {
  try {
    await parseXlsx();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
