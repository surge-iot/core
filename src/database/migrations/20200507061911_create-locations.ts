import * as Knex from 'knex';

const tableName = 'locations';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.string('name').notNullable();
    t.string('email').notNullable();
    t.integer('isPartOf').unsigned();

    t.timestamps(true, true);

    // Constraints
    t.foreign('isPartOf').references('locations.id').onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
