import * as Knex from 'knex';

const tableName = 'pointOfEquipments';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.integer('pointId').unsigned();
    t.integer('equipmentId').unsigned();
    t.timestamps(true, true);

    // Constraints
    t.foreign('pointId').references('points.id').onDelete('CASCADE');
    t.foreign('equipmentId').references('equipments.id').onDelete('CASCADE');
    t.unique(['pointId', 'equipmentId']);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
