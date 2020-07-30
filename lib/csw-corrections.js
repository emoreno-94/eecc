const rfr = require('rfr');
const Species = rfr('/models/species');


const cswCorrections = {
  fixAraucariaAraucana: () => Species.update(
    {
      filter: { scientific_name: 'araucaria araucana' },
      to: { reference_or_decree_valid_category: 'DS 79/2018 MMA' },
    }),
};

const runCorrections = async () => {
  for await (const fixKeyName of Object.keys(cswCorrections)) {
    console.log('\tRunning correction:', fixKeyName);
    await cswCorrections[fixKeyName]();
  }
};

module.exports = { runCorrections };