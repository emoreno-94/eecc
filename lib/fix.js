const _badNames = {
  'drymis winteri': 'drimys winteri',
};

const namesToRemove = {
  // siete especies de "Ravenna"
  'alstroemeria magna': true,
  'alstroemeria nidularis': true,
  'alstroemeria sabulosa': true,
  'alstroemeria venusta': true,
  'stenomesson chilense': true,
  'tristagma leichtlinii': true,
  'tristagma subbiflorum': true,
};

const isInvalidSpecies = speciesName => speciesName.match(/nombre científico no válido|no presente en chile/i);

// Checks for known bad names and replaces them by the corrected one
const badNames = (possibleBadName) => _badNames[possibleBadName] || possibleBadName;

// Comprueba si un nombre de especie debe ser eliminado y no incluirlo en la base de datos
const mustBeRemoved = speciesName => namesToRemove[speciesName];

const removeVariety = speciesName => speciesName.replace(/([ a-z]+) var\. .+/, '$1');

const removeParenthesis = speciesName => speciesName.replace(/([ a-z]+) \(.+/, '$1');

const validCategoryText = textWithNewLines => textWithNewLines
  .replace(/\n+/g, ' | ')
  .replace(/\s+/g, ' ');


module.exports = {
  badNames,
  isInvalidSpecies,
  mustBeRemoved,
  removeVariety,
  removeParenthesis,
  validCategoryText,
};
