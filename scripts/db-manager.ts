// eslint-disable-next-line import/namespace
import * as knexConfig from '../knexfile';
import * as knexDbManager from 'knex-db-manager';
const dbManager = {
  // db manager related configuration
  superUser: 'root',
  superPassword: process.env.MYSQL_ROOT_PASSWORD || 'oneboard',
  populatePathPattern: `${__dirname }/../src/database/seeds/**/*.ts`, // glob format for searching seeds
};
const config = { knex: knexConfig, dbManager };
export const manager = knexDbManager.databaseManagerFactory(config);
