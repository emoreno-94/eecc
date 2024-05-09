const cheerio = require('cheerio');
const got = require('got');
const xlsx = require('xlsx');
const rfr = require('rfr');
const parserSpeciesSheet = rfr('/parserSpeciesSheet');
const fix = rfr('/lib/fix');

const Species = rfr('/models/species');
const ValidCategory = rfr('/models/validCategory');
const Region = rfr('/models/region');

const MAIN_URL = 'https://clasificacionespecies.mma.gob.cl';


const asyncForEach = async (list, fn) => {
  for await (const e of list) {
    await fn(e);
  }
};

const getSpeciesXlsxUrl = async () => {
  const urlSelector = 'div.box-green a';

  const { body: page } = await got(MAIN_URL);
  const $ = cheerio.load(page);
  return $(urlSelector).attr('href');
};

const getXlsx = async () => {
  const url = await getSpeciesXlsxUrl();
  const { body: xlsxSpecies } = await got(url, { responseType: 'buffer' });
  return xlsx.read(xlsxSpecies);
};

const saveSpecies = async (speciesJson, transaction) => {
  const species = Species.getInstance(speciesJson.species);
  if (fix.mustBeRemoved(species.scientific_name)) {
    return console.log(`Se ignorá la especie: "${species.scientific_name}" -> debe ser removida`);
  }
  if (fix.isInvalidSpecies(species.scientific_name)) {
    return console.log(`Se ignorá la especie: "${species.scientific_name}" -> por nombre científico`);
  }
  if (fix.isInvalidSpecies(species.distribution)) {
    return console.log(`Se ignorá la especie: "${species.scientific_name}" -> por distribución`);
  }

  const [ { hash: speciesHash } ] = await Species.upsert(species, { transaction });
  // insertar categorías
  await ValidCategory.delFromSpecies(speciesHash, { transaction });
  await asyncForEach(
    speciesJson.categories,
    c => ValidCategory.tryToInsert(ValidCategory.getInstance({ shortName: c, speciesHash }), { transaction }),
  );

  // insertar regiones
  await Region.delFromSpecies(speciesHash, { transaction });
  await asyncForEach(
    speciesJson.regions,
    r => Region.insert(Region.getInstance({ regionName: r.name, value: r.val, speciesHash }), { transaction }),
  );
};

const run = async () => {
  console.log('Iniciando extracción de datos:', new Date().toISOString());

  console.log('Procesando excel...', new Date().toISOString());
  const xlsxToParse = await getXlsx();
  const speciesSheetName = xlsxToParse.SheetNames[1];
  const speciesSheet = xlsxToParse.Sheets[speciesSheetName];
  const allSpeciesJson = parserSpeciesSheet(speciesSheet);

  console.log('Actualizando especies...');
  await Species.knex.transaction(async transaction => {
    await Species.update({ to: { state: 'lost' } }, { transaction });
    await asyncForEach(allSpeciesJson, s => saveSpecies(s, transaction));
  });

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
