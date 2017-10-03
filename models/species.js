'use strict';

const hasha = require('hasha');
const omit = require('lodash.omit');
const jsondiffpatch = require('jsondiffpatch');
const rfr = require('rfr');
const knex = rfr('/lib/db/knex');
const table = 'species';

const getInstance = jsonSpecies => {
  const species = jsonSpecies;
  species.process_number_rce = jsonSpecies.process_number_rce + '';
  species.scientist_name = species.scientist_name.toLowerCase();
  species.family = species.family.toLowerCase();
  species.hash = calculateHash(species);
  species.collector_hash = calculateCollectorHash(species);
  return species;
};

const findByHash = hash => knex(table).select().where('hash', hash).first();

const insert = species => knex(table).insert(species).returning('hash');

const update = species => knex(table).where('hash', species.hash).update(species).returning('hash');

const insertOrUpdate = species => {
  return findByHash(species.hash)
    .then(dbSpecies => {
      if (dbSpecies) {
        // subir la version si hay cambios
        if (jsondiffpatch.diff(omit(dbSpecies, ['version', 'updated_at', 'created_at']), species)) {
          species.version = dbSpecies.version + 1;
        }
        return update(species);
      } else {
        return insert(species);
      }
    })
};

const calculateHash = (species) => hasha([species.scientist_name, species.family].join('&'));

const calculateCollectorHash = (species) => {
  const speciesSep = species.scientist_name.split(' ');
  return hasha([speciesSep[0], speciesSep[1], '', '', species.family, 'darwinion'].join('&'));
};

module.exports = {
  getInstance,
  findByHash,
  insert,
  update,
  insertOrUpdate,
};