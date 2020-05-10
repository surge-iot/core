import * as Knex from 'knex';

const tableName = 'sensors';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.integer('id').unsigned().primary();
    t.string('name');
    t.string('sensorTypeId').notNullable();
    t.uuid('deviceId');
    t.json('meta');

    // Associations
    t.foreign('id').references('points.id').onDelete('CASCADE');
    t.foreign('sensorTypeId').references('sensorTypes.id').onDelete('RESTRICT');

  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
