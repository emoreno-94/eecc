'use strict';

const rp = require('request-promise');
const cheerio = require('cheerio');
const retry = require('bluebird-retry');
const urlJoin = require('url-join');
const xlsx = require('xlsx');
const rfr = require('rfr');
const parserSpeciesSheet = rfr('/parserSpeciesSheet');
const speciesModel = rfr('/models/species');
const validCategoryModel = rfr('/models/validCategory');
const regionModel = rfr('/models/region');
const bPromise = require('bluebird');

const MAIN_URL = 'http://www.mma.gob.cl/clasificacionespecies';
const URL_TO_PROCCESS = urlJoin(MAIN_URL, 'listado-especies-nativas-segun-estado-2014.htm');


const getPageToProcess = (url, options = {load: true}) => {
  let RequestOptions = {
    uri: url,
    timeout: 5000,
    resolveWithFullResponse: true,
    encoding: null,
    transform: function (body) {
      return options.load ? cheerio.load(body) : body;
    },
  };

  console.log(`Processing page: ${url}`);
  return rp(RequestOptions);
};

const getPageToProcessWithRetry = (url, options = {load: true}) => {
  return retry(() => getPageToProcess(url, options), {max_tries: 1})
    .catch(err => {
      console.error(`Fail to process url: ${url}`);
      return Promise.reject(err);
    });
};

const getSpeciesXlsxUrl = () => {
  const urlSelector = 'div#container > ul > li:nth-child(2) > a';
  return getPageToProcessWithRetry(URL_TO_PROCCESS)
    .then($ => urlJoin(MAIN_URL, $(urlSelector).attr('href')))
};

const getXlsx = () => {
  return getSpeciesXlsxUrl()
    .then(url => getPageToProcessWithRetry(url, {load: false}))
    .then(xlsxSpecies => xlsx.read(xlsxSpecies));
};

const parseXlsx = () => {
  const insertCategories = (categories, speciesHash) => bPromise.map(
    categories,
    (c) => validCategoryModel.tryToInsert(validCategoryModel.getInstance(c, speciesHash)),
    {concurrency: 1}
  );

  const insertRegions = (regions, speciesHash) => bPromise.map(
    regions,
    (r) => regionModel.insert(regionModel.getInstance(r.name, r.val, speciesHash)),
    {concurrency: 5}
  );

  const saveSpecies = speciesJson => {
    const species = speciesModel.getInstance(speciesJson.species);
    return speciesModel.insertOrUpdate(species)
      .then(speciesHash => {
        return insertCategories(speciesJson.categories, speciesHash[0])
          .then(() => insertRegions(speciesJson.regions, speciesHash[0]));
      })
  };

  return getXlsx()
    .then(xlsxToParse => {
      const speciesSheetName = xlsxToParse.SheetNames[1];
      const speciesSheet = xlsxToParse.Sheets[speciesSheetName];
      return parserSpeciesSheet(speciesSheet);
    })
    .then(allSpeciesJson => {
      console.log('Updating species...');
      return validCategoryModel.removeAll()
        .then(() => regionModel.removeAll())
        .then(() => speciesModel.setAllStates('not-found'))
        .then(() => bPromise.map(allSpeciesJson, saveSpecies, {concurrency: 3}));
    })
    .then(() => {
      console.log('Done!');
      process.exit(0);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    })
};

return parseXlsx();