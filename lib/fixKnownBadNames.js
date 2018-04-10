'use strict';


const badNames = {
  'drymis winteri': 'drimys winteri',
};

// Checks for known bad names and replaces them by the corrected one
const fixKnownBadNames = (possibleBadName) => badNames[possibleBadName] || possibleBadName;


module.exports = fixKnownBadNames;
