import * as Knex from 'knex';

const tableName = 'locationLinks';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.integer('parentId').unsigned().notNullable();
    t.integer('locationId').unsigned().notNullable();
    t.timestamps(true, true);

    // Constrains
    t.foreign('locationId').references('locations.id').onDelete('CASCADE');
    t.foreign('parentId').references('locations.id').onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
