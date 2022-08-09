exports.up = knex => knex('valid_category').insert({
  id: 13,
  short_name: 'Otro',
  name: 'No encaja en las categorías normales',
});

exports.down = knex => knex('valid_category').where({
  short_name: 'Otro',
  name: 'No encaja en las categorías normales',
}).del();
