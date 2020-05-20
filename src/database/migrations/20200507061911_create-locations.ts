import * as Knex from 'knex';

const tableName = 'locations';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.string('name').notNullable();
    t.string('classId').notNullable();
    t.json('meta');
    t.timestamps(true, true);

    // Constraints
    t.foreign('classId').references('locationClasses.id').onDelete('RESTRICT').onUpdate('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
