import * as Knex from 'knex';

const tableName = 'locationLinks';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.integer('locationId').unsigned().notNullable();
    t.integer('hasLinkTo').unsigned().notNullable();
    t.timestamps(true, true);

    // Constrains
    t.foreign('locationId').references('locations.id').onDelete('CASCADE');
    t.foreign('hasLinkTo').references('locations.id').onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
