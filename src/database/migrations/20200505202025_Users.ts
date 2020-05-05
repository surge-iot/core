import * as Knex from 'knex';

const tableName = 'users';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments();

    t.string('name');
    t.string('email');
    t.string('password');

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}