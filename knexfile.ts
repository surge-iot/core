import 'dotenv/config';
import { knexSnakeCaseMappers } from 'objection';

const config = { 
  development: { 
    client: 'mysql',
    connection: "mysql://oneboard:oneboard@localhost:3306/oneboard" || process.env.DATABASE_URL,
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
    connection: "mysql://oneboard:oneboard@localhost:3306/test" || process.env.TEST_DATABASE_URL,
    migrations: {
        directory: './src/database/migrations',
        stub: './src/database/migration.stub',
    },
    seeds: {
        directory: './test/seeds',
        stub: './src/database/seed.stub'
    },
    ...knexSnakeCaseMappers(),
    debug: process.env.KNEX_DEBUG === 'true',
  }
};
const env = process.env.NODE_ENV || 'development';
console.log("USING ENVIRONMENT: ",env);
module.exports = config[env];
