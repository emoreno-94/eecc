'use strict';

const rp = require('request-promise');
const fs = require('fs-extra');
const cheerio = require('cheerio');
const retry = require('bluebird-retry');
const urlJoin = require('url-join');
const xlsx = require('xlsx');

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

  return getXlsx()
    .then(xlsxToParse => {
      const speciesSheetName = xlsxToParse.SheetNames[1];
      // console.log(speciesSheetName);
      const speciesSheet = xlsxToParse.Sheets[speciesSheetName];
      console.log(JSON.stringify(speciesSheet, null, '\t'));
      // console.log(speciesSheet['A1'])
    })
};

parseXlsx()