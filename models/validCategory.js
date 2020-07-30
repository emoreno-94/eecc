// maneja las inserciones a la tabla species_valid_category
const rfr = require('rfr');
const knex = rfr('/lib/db/knex');
const atie = rfr('/lib/db/addTransactionIfExists');


const tableName = 'species_valid_category';

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

const getInstance = ({ shortName, speciesHash }) => ({ valid_category_id: categoriesId[shortName], species_hash: speciesHash });

const findBy = (filter = {}, { transaction } = {}) => atie(knex(tableName).select().where(filter), transaction);

const findFirstBy = (filter = {}, options) => findBy(filter, options).first();

const insert = (validCategory, { transaction } = {}) => atie(knex(tableName).insert(validCategory).returning('id'), transaction);

const tryToInsert = async (validCategory, { transaction } = {}) => {
  validCategory.valid_category_id = validCategory.valid_category_id || categoriesId.otro; // clasificar como otro por defecto

  const dbSpecies = await findFirstBy(validCategory, { transaction });
  if (!dbSpecies) {
    return insert(validCategory, { transaction });
  }
};

const removeAll = ({ transaction } = {}) => atie(knex(tableName).del(), transaction);


module.exports = {
  getInstance,
  insert,
  tryToInsert,
  removeAll,
};
