import * as Knex from 'knex';

const tableName = 'setpoints';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.integer('id').unsigned().primary();
    t.string('commandTypeId').notNullable();
    t.integer('value');
    t.json('meta');

    // Associations
    t.foreign('id').references('points.id').onDelete('CASCADE');
    t.foreign('commandTypeId').references('commandTypes.id').onDelete('RESTRICT');

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
