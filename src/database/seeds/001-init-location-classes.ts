import * as Knex from 'knex';

const seedName = '001-init-location-classes';
// eslint-disable-next-line consistent-return
export async function seed(knex: Knex): Promise<Knex.QueryBuilder | null> {
  const found = await knex('knex_seeds').where('name', seedName);
  if (found.length > 0){
    console.log("Skipping ", seedName);
    return null;
  }
  try {
    await knex.transaction(async trx => {
      await knex('knex_seeds').insert({name: seedName});  
      const classes = [
        { id: 'BUILDING', name: 'Building', parentId: null},
        { id: 'FLOOR', name: 'Floor', parentId: null},
        { id: 'WING', name: 'Wing', parentId: null},
        { id: 'HVACZONE', name: 'HVAC Zone', parentId: null},
        { id: 'LIGHTINGZONE', name: 'Lighting Zone', parentId: null},
        { id: 'ROOM', name: 'Room', parentId: null},
        { id: 'ROOM.CLASSROOM', name: 'Classroom', parentId: 'ROOM'},
      ];

      const inserts = await trx('locationClasses').insert(classes)

      console.log('new location classes saved.')
    })
  } catch (error) {
    // If we get here, that means that neither the 'points' insert,
    // nor any of the command inserts will have taken place.
    console.error(error);
  }
}
