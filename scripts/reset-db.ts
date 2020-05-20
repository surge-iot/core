// eslint-disable-next-line import/namespace
import * as knexConfig from '../knexfile';
import {manager} from './db-manager';
import * as knex from 'knex';

beforeAll(async () => {
  try {
    await manager.truncateDb(['knex_migrations']);
    await knex(knexConfig).seed.run();
    console.log("DB reset complete");
  } catch (err){
    console.log(err);
  }
});

