// maneja las inserciones a la tabla species_valid_category
const rfr = require('rfr');
const knex = rfr('/lib/db/knex');
const table = 'species_valid_category';

const categoriesId = {
  CR: 1,
  DD: 2,
  EN: 3,
  EW: 4,
  EX: 5,
  FP: 6,
  IC: 7,
  LC: 8,
  NT: 9,
  R: 10,
  VU: 11,
  'Taxón no presente en Chile': 12,
  otro: 13,
};


const getInstance = (shortName, hash) => {
  return {
    valid_category_id: categoriesId[shortName],
    species_hash: hash,
  };
};

const find = (id, hash) => knex(table).select().where({ 'valid_category_id': id, 'species_hash': hash }).first();

const insert = validCategory => knex(table).insert(validCategory).returning('id');

const tryToInsert = validCategory => {
  validCategory.valid_category_id = validCategory.valid_category_id || categoriesId.otro; // clasificar como otro por defecto
  return find(validCategory.valid_category_id, validCategory.species_hash)
    .then(dbSpecies => {
      if (!dbSpecies) {
        return insert(validCategory);
      }
    });
};

const removeAll = () => knex(table).del();

module.exports = {
  getInstance,
  find,
  insert,
  tryToInsert,
  removeAll,
};
