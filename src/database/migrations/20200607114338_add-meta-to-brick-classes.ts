import * as Knex from 'knex';


export async function up(knex: Knex) {
  await knex.schema.alterTable('locationClasses', t => {
    t.json('meta');
  });
  await knex.schema.alterTable('equipmentClasses', t => {
    t.json('meta');
  });
  await knex.schema.alterTable('pointClasses', t => {
    t.json('meta');
  });
}

export async function down(knex: Knex) {
  await knex.schema.alterTable('locationClasses', t => {
    t.dropColumn('meta');
  });
  await knex.schema.alterTable('equipmentClasses', t => {
    t.dropColumn('meta');
  });
  await knex.schema.alterTable('pointClasses', t => {
    t.dropColumn('meta');
  });
}
