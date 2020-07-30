const rfr = require('rfr');
const knex = rfr('/lib/db/knex');
const atie = rfr('/lib/db/addTransactionIfExists');


const tableName = 'species_region';

const regionsId = {
  'Arica y Parinacota': 1,
  'Tarapacá': 2,
  'Antofagasta': 3,
  'Atacama': 4,
  'Coquimbo': 5,
  'Valparaíso continental': 6,
  'Metropolitana': 7,
  'O\'higgins': 8,
  'Maule': 9,
  'Bío-Bío': 10,
  'Araucanía': 11,
  'De Los Ríos': 12,
  'De Los Lagos': 13,
  'Aysén': 14,
  'Magallanes continental e insular': 15,
  'Antártica': 16,
  'Isla Pascua': 17,
  'Salas y Gómez': 18,
  'Juan Fernandez': 19,
  'Desventuradas': 20,
};

const getInstance = ({ regionName, value, speciesHash }) => ({ region_id: regionsId[regionName], species_hash: speciesHash, value });

const insert = (validCategory, { transaction } = {}) => atie(knex(tableName).insert(validCategory).returning('id'), transaction);

const removeAll = ({ transaction } = {}) => atie(knex(tableName).del(), transaction);


module.exports = {
  getInstance,
  insert,
  removeAll,
};
