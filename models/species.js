const rfr = require('rfr');
const hasha = require('hasha');
const omit = require('lodash.omit');
const jsondiffpatch = require('jsondiffpatch');

const knex = rfr('/lib/db/knex');
const atie = rfr('/lib/db/addTransactionIfExists');
const fix = rfr('/lib/fix');

const tableName = 'species';


const _calculateHash = species => hasha([ species.scientific_name, species.family ].join('&'));

const getInstance = jsonSpecies => {
  const species = jsonSpecies;
  species.process_number_rce = String(jsonSpecies.process_number_rce);
  species.scientific_name = species.scientific_name.replace(/\s+/g, ' ').toLowerCase().trim();
  species.family = (species.family || '').toLowerCase().trim();
  species.hash = _calculateHash(species);
  species.collector_hash = calculateCollectorHash(species);
  Object.keys(species).forEach(key => species[key] = (species[key] || '').trim());
  // fix middle newlines in valid_category_text
  species.valid_category_text = fix.validCategoryText(species.valid_category_text);
  return species;
};

const findBy = (filter = {}, { transaction } = {}) => atie(knex(tableName).select().where(filter), transaction);

const getByHash = (hash, { transaction } = {}) => findBy({ hash }, { transaction }).first();

const insert = (species, { transaction } = {}) => atie(knex(tableName).insert(species).returning('hash'), transaction);

const update = ({ filter = {}, to = {} }, { transaction } = {}) =>
  atie(knex(tableName).where(filter).update(to).returning('hash'), transaction);

const upsert = async (species, { transaction } = {}) => {
  species.last_date_found = new Date().toISOString();

  const dbSpecies = await getByHash(species.hash, { transaction });
  if (dbSpecies) {
    species.state = 'same-as-before';
    // subir la version si hay cambios
    const diff = jsondiffpatch.diff(
      omit(dbSpecies, [ 'version', 'updated_at', 'created_at', 'state', 'last_diff', 'last_date_found' ]),
      omit(species, [ 'state', 'last_date_found' ]));
    if (diff) {
      species.state = 'changed';
      species.last_diff = diff;
      species.version = dbSpecies.version + 1;
    }
    return update({ filter: { hash: species.hash }, to: species }, { transaction });
  } else {
    return insert(species, { transaction });
  }
};

// TODO: esto probablemente pueda dejar de existir luego de mudar los datos del colector viejo a nviro
const calculateCollectorHash = species => {
  const speciesSep = species.scientific_name.split(' ');
  return hasha([ speciesSep[0], speciesSep[1], '', '', species.family, 'darwinion' ].join('&'));
};

module.exports = {
  knex,
  getInstance,
  getByHash,
  insert,
  update,
  upsert,
};
