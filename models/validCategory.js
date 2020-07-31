// maneja las inserciones a la tabla species_valid_category
const rfr = require('rfr');
const knex = rfr('/lib/db/knex');
const atie = rfr('/lib/db/addTransactionIfExists');

const tableName = 'species_valid_category';


const getInstance = ({ shortName, speciesHash }) => ({ valid_category_short_name: shortName, species_hash: speciesHash });

const findBy = (filter = {}, { transaction } = {}) => atie(knex(tableName).select().where(filter), transaction);

const findFirstBy = (filter = {}, options) => findBy(filter, options).first();

const insert = (validCategory, { transaction } = {}) => atie(knex(tableName).insert(validCategory).returning('id'), transaction);

const tryToInsert = async (validCategory, { transaction } = {}) => {
  validCategory.valid_category_short_name = validCategory.valid_category_short_name || 'otro'; // clasificar como "otro" por defecto

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
