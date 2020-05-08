import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {

  await knex('equipments').del();
  await knex('equipment_links').del();
  const ODU = await knex('equipments').insert({
    id: 1,
    name: 'ODU',
    parentId: null,
    locationId: 1
  });
  const ac = await knex('equipments').insert({
    id: 2,
    name: 'AC 1',
    parentId: null,
    locationId: 5
  });
  const acBlower = await knex('equipments').insert({
    id: 3,
    name: 'AC 1 blower',
    parentId: ac[0],
    locationId: 5
  });

  const acCompressor = await knex('equipments').insert({
    id: 4,
    name: 'AC 1 compressor',
    parentId: ac[0],
    locationId: 5
  });


  await knex('equipment_links').insert({
    parentId: ODU[0],
    equipmentId: ac[0]
  });
}
