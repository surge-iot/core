import * as Knex from 'knex';

const tableName = 'devices';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.string('serial').notNullable();
    t.string('classId').notNullable();
    t.integer('locationId').unsigned().notNullable();
    t.json('meta');    

    t.timestamps(true, true);

    // Constraints
    t.foreign('classId').references('deviceClasses.id').onDelete('RESTRICT').onUpdate('CASCADE');
    t.foreign('locationId').references('locations.id').onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
