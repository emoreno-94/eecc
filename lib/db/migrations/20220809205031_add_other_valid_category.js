exports.up = knex => {
  return knex('valid_category').insert({
    short_name: 'Taxón con presencia accidental en Chile',
    name: 'Taxón con presencia accidental en Chile',
  });
};

exports.down = knex => {
  return knex('valid_category').where({
    short_name: 'Taxón con presencia accidental en Chile',
    name: 'Taxón con presencia accidental en Chile',
  }).del();
};
