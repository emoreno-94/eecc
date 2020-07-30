exports.up = async knex => {
  await knex.schema.table('species', table => {
    table.renameColumn('state', 'old_state');
  });
  await knex.raw(`alter table species rename constraint species_state_check to species_old_state_check`);

  await knex.schema.table('species', table => {
    table.enu('state', [ 'new', 'changed', 'same-as-before', 'lost' ]).default('new');
  });

  await knex.raw(`
    update species
      set state = case
        when old_state = 'found' then 'same-as-before'
        when old_state = 'not-found' then 'lost'
        else old_state
      end
  `);

  await knex.schema.table('species', table => {
    table.dropColumn('old_state');
  });
};

exports.down = async knex => {
  await knex.schema.table('species', table => {
    table.renameColumn('state', 'old_state');
  });
  await knex.raw(`alter table species rename constraint species_state_check to species_old_state_check`);

  await knex.schema.table('species', table => {
    table.enu('state', [ 'new', 'changed', 'found', 'not-found' ]).default('new');
  });

  await knex.raw(`
    update species
      set state = case
        when old_state = 'same-as-before' then 'found'
        when old_state = 'lost' then 'not-found'
        else old_state
      end
  `);

  await knex.schema.table('species', table => {
    table.dropColumn('old_state');
  });
};
