const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, 'src/.env') });
module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
      },
      migrations: {
        directory: path.resolve(__dirname, 'src/migrations')
      },
      seeds: {
        directory: path.resolve(__dirname, 'src/seeds')
      }
    },
    test: {
      client: 'mysql2',
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
      },
      migrations: {
        directory: path.resolve(__dirname, 'src/migrations')
      },
      seeds: {
        directory: path.resolve(__dirname, 'src/seeds')
      }
    },
    production: {
      client: 'mysql2',
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
      },
      migrations: {
        directory: path.resolve(__dirname, 'src/migrations')
      },
      seeds: {
        directory: path.resolve(__dirname, 'src/seeds')
      }
    }
}