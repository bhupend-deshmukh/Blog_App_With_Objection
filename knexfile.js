const Dotenv = require("dotenv").config();
const { DB_NAME, DB_USER, DB_PASS,} = process.env;
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      user:DB_USER,
      password:DB_PASS,
      database:DB_NAME
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
