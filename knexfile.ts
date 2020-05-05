import 'dotenv/config';
import { knexSnakeCaseMappers } from 'objection';

export const config = {
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
} ;