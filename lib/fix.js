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

// Comprueba si un nombre de especie debe ser eliminado y no incluirlo en la base de datos
const mustBeRemoved = speciesName => namesToRemove[speciesName];

const validCategoryText = textWithNewLines => textWithNewLines
  .replace(/\n+/g, ' | ')
  .replace(/\s+/g, ' ');


module.exports = {
  isInvalidSpecies,
  mustBeRemoved,
  validCategoryText,
};
