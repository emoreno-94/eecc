const rfr = require('rfr');
const knex = rfr('/lib/db/knex');
const atie = rfr('/lib/db/addTransactionIfExists');

const tableName = 'species_region';


const getInstance = ({ regionName, value, speciesHash }) => ({ region_name: regionName, species_hash: speciesHash, value });

const insert = (validCategory, { transaction } = {}) => atie(knex(tableName).insert(validCategory).returning('id'), transaction);

const delFromSpecies = (speciesHash, { transaction } = {}) => atie(knex(tableName).del().where({ species_hash: speciesHash }), transaction);


module.exports = {
  getInstance,
  insert,
  delFromSpecies,
};
