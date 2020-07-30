// maneja las inserciones a la tabla species_region
const rfr = require('rfr');
const knex = rfr('/lib/db/knex');
const table = 'species_region';

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


const getInstance = (regionName, value, speciesHash) => {
  return {
    region_id: regionsId[regionName],
    species_hash: speciesHash,
    value: value,
  };
};

const find = (id, hash) => knex(table).select().where({ 'region_id': id, 'species_hash': hash }).first();

const insert = validCategory => knex(table).insert(validCategory).returning('id');

const removeAll = () => knex(table).del();

module.exports = {
  getInstance,
  find,
  insert,
  removeAll,
};
