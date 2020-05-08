import * as Knex from 'knex';

const tableName = 'points';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.integer('locationId').unsigned();
    t.integer('equipmentId').unsigned();
    t.timestamps(true, true);

    // Constraints
    t.foreign('locationId').references('locations.id').onDelete('CASCADE');
    t.foreign('equipmentId').references('equipments.id').onDelete('CASCADE');

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
