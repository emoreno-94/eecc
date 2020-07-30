const cheerio = require('cheerio');
const got = require('got');
const urlJoin = require('url-join');
const xlsx = require('xlsx');
const rfr = require('rfr');
const parserSpeciesSheet = rfr('/parserSpeciesSheet');
const fix = rfr('/lib/fix');
const cswCorrections = rfr('/lib/csw-corrections');

const Species = rfr('/models/species');
const ValidCategory = rfr('/models/validCategory');
const Region = rfr('/models/region');

const MAIN_URL = 'http://www.mma.gob.cl/clasificacionespecies';
const URL_TO_PROCESS = urlJoin(MAIN_URL, 'listado-especies-nativas-segun-estado-2014.htm');


const asyncForEach = async (list, fn) => {
  for await (const e of list) {
    await fn(e);
  }
};

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

const _insertCategories = (categories, speciesHash) =>
  asyncForEach(categories, c => ValidCategory.tryToInsert(ValidCategory.getInstance({ shortName: c, speciesHash })));

const _insertRegions = (regions, speciesHash) =>
  asyncForEach(regions, r => Region.insert(Region.getInstance({ regionName: r.name, value: r.val, speciesHash })));

const saveSpecies = async speciesJson => {
  const species = Species.getInstance(speciesJson.species);
  if (! fix.mustBeRemoved(species.scientific_name)) {
    const [ speciesHash ] = await Species.upsert(species);
    await _insertCategories(speciesJson.categories, speciesHash);
    await _insertRegions(speciesJson.regions, speciesHash);
  }
};

const run = async () => {
  console.log('Iniciando extracción de datos:', new Date().toISOString());

  console.log('Procesando excel...', new Date().toISOString());
  const xlsxToParse = await getXlsx();
  const speciesSheetName = xlsxToParse.SheetNames[1];
  const speciesSheet = xlsxToParse.Sheets[speciesSheetName];
  const allSpeciesJson = parserSpeciesSheet(speciesSheet);

  console.log('Actualizando especies...');
  await ValidCategory.removeAll();
  await Region.removeAll();
  await Species.update({ to: { state: 'lost' } });
  await asyncForEach(allSpeciesJson, saveSpecies);

  console.log('Corrigiendo especies...');
  await cswCorrections.runCorrections();

  console.log('Proceso terminado:', new Date().toISOString());
};


(async () => {
  try {
    await run();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
