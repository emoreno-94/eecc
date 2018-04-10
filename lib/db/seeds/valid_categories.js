'use strict';


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('valid_category').del()
    .then(function () {
      // Inserts seed entries
      return knex('valid_category').insert([
        {
          id: 1,
          short_name: 'CR',
          name: 'En peligro crítico'
        },
        {
          id: 2,
          short_name: 'DD',
          name: 'Datos insuficientes'
        },
        {
          id: 3,
          short_name: 'EN',
          name: 'En Peligro'
        },
        {
          id: 4,
          short_name: 'EW',
          name: 'Extinta en estado silvestre'
        },
        {
          id: 5,
          short_name: 'EX',
          name: 'Extinta'
        },
        {
          id: 6,
          short_name: 'FP',
          name: 'Fuera de Peligro'
        },
        {
          id: 7,
          short_name: 'IC',
          name: 'Insuficientemente Conocida'
        },
        {
          id: 8,
          short_name: 'LC',
          name: 'Preocupación menor'
        },
        {
          id: 9,
          short_name: 'NT',
          name: 'Casi amenazada'
        },
        {
          id: 10,
          short_name: 'R',
          name: 'Rara'
        },
        {
          id: 11,
          short_name: 'VU',
          name: 'Vulnerable'
        },
        {
          id: 12,
          short_name: 'Taxón no presente en Chile',
          name: 'Taxón no presente en Chile'
        },
      ]);
    });
};
