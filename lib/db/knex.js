const dbConnection = require('config').get('dbConnection');

const knex = require('knex')({
  client: 'pg',
  connection: {
    database: dbConnection.db,
    user: dbConnection.user,
    password: dbConnection.password,
    host: dbConnection.host,
  },
});

module.exports = knex;