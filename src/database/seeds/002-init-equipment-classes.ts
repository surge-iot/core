import * as Knex from 'knex';

const seedName = '002-init-equipment-classes';
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
        { id: 'FIRESAFETYSYSTEM', name: 'Fire Safety System', parentId: null},
        { id: 'HVAC', name: 'HVAC', parentId: null},
        { id: 'HVAC.ODU', name: 'ODU', parentId: 'HVAC'},
        { id: 'HVAC.AHU', name: 'AHU', parentId: 'HVAC'},
        { id: 'HVAC.FAN', name: 'Fan', parentId: 'HVAC'},
        { id: 'HVAC.PUMP', name: 'Pump', parentId: 'HVAC'},
        { id: 'HVAC.TERMINALUNIT', name: 'Terminal Unit', parentId: 'HVAC'},
        { id: 'HVAC.TERMINALUNIT.FANCOILUNIT', name: 'Fan Coil Unit', parentId: 'HVAC.TERMINALUNIT'},
        { id: 'HVAC.TERMINALUNIT.VAV', name: 'VAV', parentId: 'HVAC.TERMINALUNIT'},
        { id: 'HVAC.VALVE', name: 'Valve', parentId: 'HVAC'},
        { id: 'LIGHTINGSYSTEM', name: 'Lighting System', parentId: null},
        { id: 'LIGHTINGSYSTEM.LIGHT', name: 'Light', parentId: 'LIGHTINGSYSTEM'},
        { id: 'FAN', name: 'Fan', parentId: null},
        { id: 'FAN.CEILINGFAN', name: 'Ceiling Fan', parentId: 'FAN'},
        { id: 'WATERSYSTEM', name: 'Water System', parentId: null},
      ];

      const inserts = await trx('equipmentClasses').insert(classes)

      console.log('new equipment classes saved.')
    })
  } catch (error) {
    // If we get here, that means that neither the 'points' insert,
    // nor any of the command inserts will have taken place.
    console.error(error);
  }
}
