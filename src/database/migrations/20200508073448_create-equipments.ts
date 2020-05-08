import * as Knex from 'knex';

const tableName = 'equipments';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.string('name').notNullable();
    t.integer('parentId').unsigned();
    t.integer('locationId').unsigned();
    t.json('meta');
    t.timestamps(true, true);

    // Constraints
    t.foreign('parentId').references('equipments.id').onDelete('CASCADE');
    t.foreign('locationId').references('locations.id').onDelete('CASCADE');

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}