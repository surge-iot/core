import * as Knex from 'knex';

const tableName = 'points';

export async function up(knex: Knex) {
  return knex.schema.alterTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.string('name');

  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable(tableName, t => {
    t.dropColumn('name');
  });
}
