import * as Knex from 'knex';

const tableName = 'devicePointMappings';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.integer('deviceId').unsigned().notNullable();
    t.integer('pointId').unsigned().notNullable();
    t.json('meta');
    t.timestamp('decommissionedAt');
    t.timestamps(true, true);

    // Constrains
    t.foreign('deviceId').references('devices.id').onDelete('CASCADE');
    t.foreign('pointId').references('points.id').onDelete('CASCADE');

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
