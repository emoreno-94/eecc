module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: [ 'eslint:recommended', '@csw/base' ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
};
