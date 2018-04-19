'use strict';


const badNames = {
  'drymis winteri': 'drimys winteri',
};

const namesToRemove = {
  // cuatro especies de "Ravenna"
  'alstroemeria magna': true,
  'alstroemeria nidularis': true,
  'alstroemeria sabulosa': true,
  'alstroemeria venusta': true,
};

// Checks for known bad names and replaces them by the corrected one
const fixKnownNames = (possibleBadName) => badNames[possibleBadName] || possibleBadName;

// Comprueba si un nombre de especie debe ser eliminado y no incluirlo en la base de datos
const mustBeRemoved = speciesName => namesToRemove[speciesName];

module.exports = {
  fixKnownBadNames: fixKnownNames,
  mustBeRemoved,
};
