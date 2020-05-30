import * as Knex from 'knex';
const seedName = '103-init-points';
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
      const sensors = [
        { id: 1, locationId: 5, equipmentId: null, classId: 'SENSOR.POWER' },
        { id: 2, locationId: 5, equipmentId: null, classId: 'SENSOR.THI.TEMPERATURE' },
        { id: 3, locationId: 5, equipmentId: 2, classId: 'SENSOR.THI.TEMPERATURE' },
      ];
      await trx('points').insert(sensors)

      const commands = [
        { id: 4, locationId: 5, equipmentId: 2, classId: 'COMMAND.SWITCH' },
        { id: 5, locationId: 5, equipmentId: 2, classId: 'COMMAND.TEMPERATURE' },
        { id: 6, locationId: 5, equipmentId: 5, classId: 'COMMAND.SWITCH' },
        { id: 7, locationId: 5, equipmentId: 5, classId: 'COMMAND.SPEED' },
      ];
      await trx('points').insert(commands);

      // const setpoints = [
      //   { id: 8, locationId: 5, equipmentId: 2, classId: 'SETPOINT.SWITCH' },
      //   { id: 9, locationId: 5, equipmentId: 2, classId: 'SETPOINT.TEMPERATURE' },
      //   { id: 10, locationId: 5, equipmentId: 5, classId: 'SETPOINT.SWITCH' },
      //   { id: 11, locationId: 5, equipmentId: 5, classId: 'SETPOINT.SPEED' },
      // ];
      // await trx('points').insert(setpoints);

      const pointOfEquipments = [
        { pointId: 3, equipmentId: 2 },

        { pointId: 4, equipmentId: 2 },
        { pointId: 5, equipmentId: 2 },
        { pointId: 6, equipmentId: 5 },
        { pointId: 7, equipmentId: 5 },

        // { pointId: 8, equipmentId: 2 },
        // { pointId: 9, equipmentId: 2 },
        // { pointId: 10, equipmentId: 5 },
        // { pointId: 11, equipmentId: 5 },
      ];
      await trx('pointOfEquipments').insert(pointOfEquipments)

      const pointOfLocations = [
        { pointId: 1, locationId: 5 },
        { pointId: 2, locationId: 5 },
      ];
      await trx('pointOfLocations').insert(pointOfLocations)

      console.log('new points saved.')
    })
  } catch (error) {
    // If we get here, that means that neither the 'points' insert,
    // nor any of the command inserts will have taken place.
    console.error(error);
  }
}
