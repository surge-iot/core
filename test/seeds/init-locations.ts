import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {

  await knex('locations').del();
  const building = await knex('locations').insert({
    name: 'Building 1',
    isPartOfId: null
  });
  const floor = await knex('locations').insert({
    name: 'Floor 1',
    isPartOfId: building[0]
  });
  const wing = await knex('locations').insert({
    name: 'Wing 1',
    isPartOfId: building[0]
  });

  const room = await knex('locations').insert({
    name: 'Room 1',
    isPartOfId: floor[0]
  });

  await knex('location_links').insert({
    locationId: wing[0],
    hasLinkToId: room[0]
  });
}
