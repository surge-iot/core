import 'dotenv/config';
import { knexSnakeCaseMappers } from 'objection';

const config = { 
  development: { 
    client: 'mysql',
    connection: process.env.DATABASE_URL || "mysql://oneboard:oneboard@localhost:3306/oneboard",
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
    connection:  {
      host: 'localhost',
      database: 'test',
      user: process.env.TEST_DATABASE_USER || 'oneboard',
      password: process.env.TEST_DATABASE_PASSWORD ||'oneboard',
    },
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
