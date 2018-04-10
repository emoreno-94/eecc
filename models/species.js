'use strict';

const hasha = require('hasha');
const omit = require('lodash.omit');
const jsondiffpatch = require('jsondiffpatch');
const rfr = require('rfr');
const table = 'species';

const knex = rfr('/lib/db/knex');
const fixKnownBadNames = rfr('/lib/fixKnownBadNames');


const getInstance = jsonSpecies => {
  const species = jsonSpecies;
  species.process_number_rce = String(jsonSpecies.process_number_rce);
  species.scientist_name = fixKnownBadNames(species.scientist_name.toLowerCase());
  species.family = species.family.toLowerCase();
  species.hash = calculateHash(species.scientist_name, species.family);
  species.collector_hash = calculateCollectorHash(species);
  Object.keys(species).forEach(key => species[ key] = species[ key].trim());
  return species;
};

const findByHash = hash => knex(table).select().where('hash', hash).first();

const insert = species => knex(table).insert(species).returning('hash');

const update = species => knex(table).where('hash', species.hash).update(species).returning('hash');

const setAllStates = () => knex(table).update('state', 'not-found');

const insertOrUpdate = species => {
  return findByHash(species.hash)
    .then(dbSpecies => {
      if (dbSpecies) {
        species.state = 'found';
        species.last_date_found = new Date().toISOString();
        // subir la version si hay cambios
        const diff = jsondiffpatch.diff(
          omit(dbSpecies, [ 'version', 'updated_at', 'created_at', 'state', 'last_diff', 'last_date_found' ]),
          omit(species, [ 'state', 'last_date_found' ]));
        if (diff) {
          species.state = 'changed';
          species.version = dbSpecies.version + 1;
          species.last_diff = diff;
        }
        // no actualizar el hash del colector pues podría ser cambiado por eventual linkeo posterior
        delete species.collector_hash;
        return update(species);
      } else {
        return insert(species);
      }
    });
};

const calculateHash = (scientist_name, family) => hasha([ scientist_name, family ].join('&'));

const calculateCollectorHash = (species) => {
  const speciesSep = species.scientist_name.split(' ');
  return hasha([ speciesSep[ 0 ], speciesSep[ 1 ], '', '', species.family, 'darwinion' ].join('&'));
};

module.exports = {
  getInstance,
  findByHash,
  insert,
  update,
  insertOrUpdate,
  setAllStates,
};
