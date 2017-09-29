'use strict';

const rfr = require('rfr');
const formatExcel = rfr('/formatExcel');

const sameColumnsInFormat = (xlsx) => {
  return Object.keys(formatExcel)
    .every(formatModel =>
      Object.keys(formatExcel[formatModel])
        .every(colLetter => {
          const cleanXlsxHeader = xlsx[`${colLetter}1`].v.replace(/\s+/g, ' ').trim();
          const cleanFormat = formatExcel[formatModel][colLetter].xlsx.replace(/\s+/g, ' ').trim();
          return cleanFormat === cleanXlsxHeader;
        }))
};

const getSpecies = (speciesSheet, row) => {
  const species = {};
  Object.keys(formatExcel.speciesFormat).forEach(col => {
    species[formatExcel.speciesFormat[col].db.column] = speciesSheet[`${col}${row}`] ? speciesSheet[`${col}${row}`].v : '';
  });
  species.scientist_name = species.scientist_name.toLowerCase();
  species.family = species.family.toLowerCase();
  return species.scientist_name !== '' ? species : null;
};

const getRegions = (speciesSheet, row) => {
  const regions = [];
  Object.keys(formatExcel.regionsFormat).forEach(col => {
    if (speciesSheet[`${col}${row}`].v !== 0) {
      regions.push({
        name: formatExcel.regionsFormat[col].xlsx,
        val: speciesSheet[`${col}${row}`].v,
      });
    }
  });
  return regions;
};

const getValidCategories = (speciesSheet, row) => {
  const cleanCategories = textCategories => {
    let categories = textCategories.replace(/\(.*?\)|{.*?}|\[.*?]/g, '').split(/[,;\n-]/);
    categories = categories.map(c => c.trim());
    categories = categories.filter(c => c !== '');
    return categories
  };

  let categories = [];
  Object.keys(formatExcel.validCategoryFormat).forEach(col => {
    const textCategories = speciesSheet[`${col}${row}`].v;
    textCategories.replace(/\(.*?\)|{.*?}|\[.*?]/g, '');
    categories = cleanCategories(textCategories);
  });
  return categories;
};


const parseInfo = speciesSheet => {
  const rows = parseInt(speciesSheet['!ref'].replace(/.*?(\d+)$/, '$1'), 10);
  const species = [];
  for (let row = 2; row <= rows; row++) {
    species.push({
      species: getSpecies(speciesSheet, row),
      regions: getRegions(speciesSheet, row),
      categories: getValidCategories(speciesSheet, row),
    });
  }
  return species;
};

const parseXlsx = (speciesSheet) => {
  if (sameColumnsInFormat(speciesSheet)) {
    return parseInfo(speciesSheet);
  } else {
    console.error('Excel have a change in headers!!!');
  }
};

module.exports = parseXlsx;
