const rfr = require('rfr');
const formatExcel = rfr('/formatExcel');

const sameColumnsInFormat = xlsx =>
  Object.keys(formatExcel)
    .every(formatModel =>
      Object.keys(formatExcel[formatModel])
        .every(colLetter => {
          const cleanXlsxHeader = xlsx[`${colLetter}1`].v.replace(/\s+/g, ' ').trim();
          const cleanFormat = formatExcel[formatModel][colLetter].xlsx.replace(/\s+/g, ' ').trim();
          if (cleanFormat !== cleanXlsxHeader && cleanXlsxHeader.includes(cleanFormat.substr(0, 8))) {
            console.log('WARNING: Columnas difieren en nombres, pero parten similar');
            console.log('-> ', cleanFormat);
            console.log('-> ', cleanXlsxHeader);
            console.log('-----------------');
          }
          return cleanXlsxHeader.includes(cleanFormat.substr(0, 8));
        }));

const getSpecies = (speciesSheet, row) => {
  const species = {};
  Object.keys(formatExcel.speciesFormat).forEach(col => {
    species[formatExcel.speciesFormat[col].db.column] = speciesSheet[`${col}${row}`] ? speciesSheet[`${col}${row}`].v : '';
  });
  return species.scientific_name !== '' ? species : null;
};

const getRegions = (speciesSheet, row) =>
  Object.keys(formatExcel.regionsFormat)
    .filter(col => speciesSheet[`${col}${row}`].v !== 0)
    .map(col => ({ name: formatExcel.regionsFormat[col].xlsx, val: speciesSheet[`${col}${row}`].v }));

const getValidCategories = (speciesSheet, row) => {
  const regRemoveExtra = /\(.*?\)|{.*?}|\[.*?]/g;
  const cleanCategories = textCategories => textCategories
    .replace(regRemoveExtra, '')
    .split(/[,;\n-]/)
    .map(c => c.trim())
    .filter(c => c !== '');

  let categories = [];
  Object.keys(formatExcel.validCategoryFormat).forEach(col => {
    const textCategories = speciesSheet[`${col}${row}`].v;
    categories = [ ...categories, ...cleanCategories(textCategories) ];
  });
  return categories;
};


const parseInfo = speciesSheet => {
  const rows = speciesSheet['!rows'].length;
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

const parseXlsx = speciesSheet => {
  if (sameColumnsInFormat(speciesSheet)) {
    return parseInfo(speciesSheet);
  } else {
    throw new Error('Excel have a change in headers!!!');
  }
};

module.exports = parseXlsx;
