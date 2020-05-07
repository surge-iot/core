import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {

  await knex('locations').del();
  await knex('location_links').del();
  const building = await knex('locations').insert({
    id: 1,
    name: 'Building 1',
    parentId: null
  });
  const floor = await knex('locations').insert({
    id: 2,
    name: 'Floor 1',
    parentId: building[0]
  });
  const wing = await knex('locations').insert({
    id: 3,
    name: 'Wing 1',
    parentId: building[0]
  });

  const room = await knex('locations').insert({
    id: 4,
    name: 'Room 1',
    parentId: floor[0]
  });

  await knex('location_links').insert({
    parentId: wing[0],
    locationId: room[0]
  });
}
