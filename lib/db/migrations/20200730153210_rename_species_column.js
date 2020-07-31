exports.up = async knex => {
  await knex.schema.table('species', table => {
    table.renameColumn('scientist_name', 'scientific_name');
  });
};

exports.down = async knex => {
  await knex.schema.table('species', table => {
    table.renameColumn('scientific_name', 'scientist_name');
  });
};
