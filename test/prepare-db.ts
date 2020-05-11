import * as knex from '../knexfile';
import * as knexDbManager from 'knex-db-manager';
const dbManager = {
  // db manager related configuration
  superUser: process.env.ROOT_USERNAME || 'root',
  superPassword: process.env.ROOT_PASSWORD || 'oneboard',
  populatePathPattern: __dirname + '/../src/database/seeds/**/*.ts', // glob format for searching seeds
}
const config = { knex, dbManager }
let manager = knexDbManager.databaseManagerFactory(config);
manager.createDbOwnerIfNotExist().then(() => {
  manager.dropDb().then(() => {
    manager.createDb().then(() => {
      manager.truncateDb().then(() => {
        manager.migrateDb().then(() => {
          manager.populateDb().then(() => {
            console.log("All done");
            process.exit(0);
          })
        })
      })
    })
  })
})
