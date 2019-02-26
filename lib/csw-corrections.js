'use strict';

const rfr = require('rfr');
const knex = rfr('/lib/db/knex');

const cswCorrections = {
  fixAraucariaAraucana: () => knex('species')
    .where('scientist_name', 'araucaria araucana')
    .update({
      reference_or_decree_valid_category: 'DS 79/2018 MMA',
    })
};

const runCorrections = async () => {
  const correctionsKeys = Object.keys(cswCorrections);
  for (let i = 0; i < correctionsKeys.length; i++) {
    console.log('Running correction:', correctionsKeys[i]);
    await cswCorrections[correctionsKeys[i]]();
  }
};

module.exports = { runCorrections };