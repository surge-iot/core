import * as Knex from 'knex';

const tableName = '';

export async function up(knex: Knex) {
  await knex.schema.alterTable('locationLinks', t => {
    t.json('meta');
  });
  await knex.schema.alterTable('equipmentLinks', t => {
    t.json('meta');
  });
  await knex.schema.alterTable('pointOfLocations', t => {
    t.json('meta');
  });
  await knex.schema.alterTable('pointOfEquipments', t => {
    t.json('meta');
  });
}

export async function down(knex: Knex) {
  await knex.schema.alterTable('locationLinks', t => {
    t.dropColumn('meta');
  });
  await knex.schema.alterTable('equipmentLinks', t => {
    t.dropColumn('meta');
  });
  await knex.schema.alterTable('pointOfLocations', t => {
    t.dropColumn('meta');
  });
  await knex.schema.alterTable('pointOfEquipments', t => {
    t.dropColumn('meta');
  });}
