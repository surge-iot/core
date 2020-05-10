import * as Knex from 'knex';

const tableName = 'sensorTypes';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.string('id').primary();
    t.string('name');
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
