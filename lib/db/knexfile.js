'use strict';

const rfr = require('rfr');
const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(rfr.root, 'config');
const dbConnection = require('config').get('dbConnection');

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: dbConnection.db,
      user: dbConnection.user,
      password: dbConnection.password,
      host: dbConnection.host,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
