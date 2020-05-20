import {manager} from './db-manager';

manager.dropDb().then(() => {
  manager.createDb().then(() => {
    manager.migrateDb().then(() => {
      console.log("All done");
      process.exit(0);
    });
  });
});
