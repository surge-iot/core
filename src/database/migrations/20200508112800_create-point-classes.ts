import * as Knex from 'knex';

const tableName = 'pointClasses';

export async function up(knex: Knex) {
  return knex.schema.createTable(tableName, t => {
    t.string('id').primary(); 
    t.string('name').notNullable();
    t.string('parentId');
    t.timestamps(true, true);
    
    // Constraints
    t.foreign('parentId').references('pointClasses.id').onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(tableName);
}
