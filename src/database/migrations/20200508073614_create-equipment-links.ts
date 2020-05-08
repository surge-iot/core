import * as Knex from 'knex';

const tableName = 'equipmentLinks';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.integer('parentId').unsigned().notNullable();
    t.integer('equipmentId').unsigned().notNullable();
    t.timestamps(true, true);

    // Constrains
    t.foreign('equipmentId').references('equipments.id').onDelete('CASCADE');
    t.foreign('parentId').references('equipments.id').onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
