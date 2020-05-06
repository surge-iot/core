import * as Knex from 'knex';

const tableName = 'users';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments();

    t.string('name').notNullable();
    t.string('email').notNullable();
    t.string('password').notNullable();
    t.boolean('isAdmin').notNullable().defaultTo(false);

    t.timestamps(true, true);

    t.unique(['email'])
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}