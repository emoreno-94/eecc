exports.up = knex => knex('valid_category').insert({
  short_name: 'Taxón sin registros de presencia en Chile',
  name: 'Taxón sin registros de presencia en Chile',
});

exports.down = knex => knex('valid_category').where({
  short_name: 'Taxón sin registros de presencia en Chile',
  name: 'Taxón sin registros de presencia en Chile',
}).del();
