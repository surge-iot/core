import * as Knex from 'knex';

const seedName = '003-init-point-classes';
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
        { id: 'ALARM', name: 'Alarm', parentId: null},

        { id: 'COMMAND', name: 'Command', parentId: null},
        { id: 'COMMAND.SWITCH', name: 'Switch', parentId: 'COMMAND'},
        { id: 'COMMAND.TEMPERATURE', name: 'Temperature', parentId: 'COMMAND'},
        { id: 'COMMAND.SPEED', name: 'Speed', parentId: 'COMMAND'},
        
        { id: 'SENSOR', name: 'Sensor', parentId: null},
        { id: 'SENSOR.THI', name: 'Temperature, Humidity, Irradiance', parentId: 'SENSOR'},
        { id: 'SENSOR.THI.TEMPERATURE', name: 'Temperature', parentId: 'SENSOR.THI'},
        { id: 'SENSOR.THI.HUMIDITY', name: 'Humidity', parentId: 'SENSOR.THI'},
        { id: 'SENSOR.THI.LUMINOSITY', name: 'Luminosity', parentId: 'SENSOR.THI'},
        { id: 'SENSOR.POWER', name: 'Power Meter', parentId: 'SENSOR'},
        { id: 'SENSOR.OCCUPANCY', name: 'Occupancy', parentId: 'SENSOR'},
        
        { id: 'SETPOINT', name: 'Setpoint', parentId: null},
        { id: 'SETPOINT.SWITCH', name: 'Switch', parentId: 'SETPOINT'},
        { id: 'SETPOINT.TEMPERATURE', name: 'Temperature', parentId: 'SETPOINT'},
        { id: 'SETPOINT.SPEED', name: 'Speed', parentId: 'SETPOINT'},

        { id: 'STATUS', name: 'Status', parentId: null}
      ];

      const inserts = await trx('pointClasses').insert(classes)

      console.log('new point classes saved.')
    })
  } catch (error) {
    // If we get here, that means that neither the 'points' insert,
    // nor any of the command inserts will have taken place.
    console.error(error);
  }
}
