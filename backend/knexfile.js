// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      user:process.env.DOCKER_USER,
      password: process.env.DOCKER_PASSWORD,
      port: process.env.DOCKER_PORT,
      database: process.env.PG_DATABASE
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      user:process.env.DOCKER_USER,
      password: process.env.DOCKER_PASSWORD,
      port: process.env.DOCKER_PORT,
      database: process.env.PG_DATABASE
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
      user:process.env.DOCKER_USER,
      password: process.env.DOCKER_PASSWORD,
      port: process.env.DOCKER_PORT,
      database: process.env.PG_DATABASE
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
