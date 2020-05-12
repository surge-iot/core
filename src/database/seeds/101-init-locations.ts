import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  try {
    await knex.transaction(async trx => {
      await knex('locations').del();
      await knex('locationLinks').del();
      const locations = [
        { id: 1, name: 'Building', parentId: null, classId: 'BUILDING' },
        { id: 2, name: 'Floor 1', parentId: 1, classId: 'FLOOR' },
        { id: 3, name: 'Wing 1', parentId: 1, classId: 'WING' },
        { id: 4, name: 'Room 1', parentId: 2, classId: 'ROOM' },
        { id: 5, name: 'Room 2', parentId: 2, classId: 'ROOM' }
      ];
      const inserts = await trx('locations').insert(locations)
      console.log(inserts.length + ' new locations saved.')

      const locationLinks = [
        { parentId: 3, locationId: 4 }
      ]
      await trx('locationLinks').insert(locationLinks);

      console.log(inserts.length + ' new location links saved.')
    })
  } catch (error) {
    // If we get here, that means that neither the 'points' insert,
    // nor any of the command inserts will have taken place.
    console.error(error);
  }
}
