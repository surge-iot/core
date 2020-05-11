import * as Knex from 'knex';

const tableName = 'pointOfLocations';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.integer('pointId').unsigned();
    t.integer('locationId').unsigned();
    t.timestamps(true, true);

    // Constraints
    t.foreign('pointId').references('points.id').onDelete('CASCADE');
    t.foreign('locationId').references('locations.id').onDelete('CASCADE');
    t.unique(['pointId', 'locationId']);

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
