import 'dotenv/config';
import { knexSnakeCaseMappers } from 'objection';

const config = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT || 3306,
      database: process.env.DATABASE_NAME || 'oneboard',
      user: process.env.DATABASE_USER || 'oneboard',
      password: process.env.DATABASE_PASSWORD || 'oneboard',
    },
    migrations: {
      directory: './src/database/migrations',
      stub: './src/database/migration.stub',
    },
    seeds: {
      directory: './src/database/seeds',
      stub: './src/database/seed.stub'
    },
    ...knexSnakeCaseMappers(),
    debug: process.env.KNEX_DEBUG === 'true',
  },
  test: {
    client: 'mysql',
    connection: {
      host: process.env.TEST_DATABASE_HOST || 'localhost',
      port: process.env.TEST_DATABASE_PORT || 3306,
      database: process.env.TEST_DATABASE_NAME || 'test',
      user: process.env.TEST_DATABASE_USER || 'oneboard',
      password: process.env.TEST_DATABASE_PASSWORD || 'oneboard',
    },
    migrations: {
      directory: './src/database/migrations',
      stub: './src/database/migration.stub',
    },
    seeds: {
      directory: './src/database/seeds',
      stub: './src/database/seed.stub'
    },
    ...knexSnakeCaseMappers(),
    debug: process.env.KNEX_DEBUG === 'true',
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
    pool: {
      min: process.env.DATABASE_POOL_MIN,
      max: process.env.DATABASE_POOL_MAX,
    },
    ...knexSnakeCaseMappers(),
  }
};
const env = process.env.NODE_ENV || 'development';
console.log("USING ENVIRONMENT: ", env);
module.exports = config[env];
