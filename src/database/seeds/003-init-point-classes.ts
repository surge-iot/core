import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  try {
    await knex.transaction(async trx => {
      await knex('pointClasses').del();
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

      console.log(inserts.length + ' new point classes saved.')
    })
  } catch (error) {
    // If we get here, that means that neither the 'points' insert,
    // nor any of the command inserts will have taken place.
    console.error(error);
  }
}
