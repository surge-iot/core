import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  await knex('sensorTypes').del();
  await knex('sensorTypes').insert([{
    id:"POWER",
    name: "Power Meter"
  },{
    id:"TEMPERATURE",
    name:"Temperature Sensor"
  },{
    id: "AQI",
    name:"Air Quality Monitor"
  }, {
    id:"THI",
    name:"Temperature, humidity and luminosity sensor"
  }]);
}
