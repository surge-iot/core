import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  await knex('commands').del();
  try {
    await knex.transaction(async trx => {
      const points = [
        { id: 1, locationId: 5, equipmentId: 2 },
        { id: 2, locationId: 5, equipmentId: 2 },
        { id: 3, locationId: 5, equipmentId: 5 },
        { id: 4, locationId: 5, equipmentId: 5 },
        { id: 5, locationId: 5, equipmentId: null }
      ];
      const commands = [
        { id: 1, commandTypeId: 'SWITCH'},
        { id: 2, commandTypeId: 'TEMPERATURE'},
        { id: 3, commandTypeId: 'SWITCH'},
        { id: 4, commandTypeId: 'SPEED'},
        { id: 5, commandTypeId: 'SWITCH' }
      ];

      await trx('points').insert(points)
      const inserts = await trx('commands').insert(commands)

      console.log(inserts.length + ' new books saved.')
    })
  } catch (error) {
    // If we get here, that means that neither the 'points' insert,
    // nor any of the command inserts will have taken place.
    console.error(error);
  }
}
