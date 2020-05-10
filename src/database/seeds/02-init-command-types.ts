import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  await knex('commandTypes').del();
  await knex('commandTypes').insert([{
    id:"SWITCH",
    name: "ON/OFF Switch"
  },{
    id:"SPEED",
    name:"Speed regulator"
  },{
    id: "TEMPERATURE",
    name:"Change temperature"
  }, {
    id:"MODE",
    name:"Change mode"
  }]);
}
