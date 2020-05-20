import * as Knex from 'knex';
const seedName = '101-init-locations';
// eslint-disable-next-line consistent-return
export async function seed(knex: Knex): Promise<Knex.QueryBuilder | null> {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  const found = await knex('knex_seeds').where('name', seedName);
  if (found.length > 0){
    console.log("Skipping ", seedName);
    return null;
  }
  try {
    await knex.transaction(async trx => {
      await knex('knex_seeds').insert({name: seedName});  
      const locations = [
        { id: 1, name: 'Building', classId: 'BUILDING' },
        { id: 2, name: 'Floor 1', classId: 'FLOOR' },
        { id: 3, name: 'Wing 1', classId: 'WING' },
        { id: 4, name: 'Room 1', classId: 'ROOM' },
        { id: 5, name: 'Room 2', classId: 'ROOM' }
      ];
      const inserts = await trx('locations').insert(locations)
      console.log('new locations saved.')

      const locationLinks = [
        { parentId: 3, locationId: 4 },
        { parentId: 1, locationId: 2 },
        { parentId: 1, locationId: 3 },
        { parentId: 2, locationId: 4 },
        { parentId: 2, locationId: 5 },
      ]
      await trx('locationLinks').insert(locationLinks);

      console.log('new location links saved.')
    })
  } catch (error) {
    // If we get here, that means that neither the 'points' insert,
    // nor any of the command inserts will have taken place.
    console.error(error);
  }
}
