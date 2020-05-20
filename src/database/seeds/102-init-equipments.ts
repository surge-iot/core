import * as Knex from 'knex';
const seedName = '102-init-equipments';
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
      const equipments = [
        { id: 1, name: 'ODU', locationId: 1, classId: 'HVAC.ODU' },
        { id: 2, name: 'AC 1', locationId: 5, classId: 'HVAC.TERMINALUNIT' },
        { id: 3, name: 'AC 1 blower', locationId: 5, classId: 'HVAC.TERMINALUNIT.FANCOILUNIT' },
        { id: 4, name: 'AC 1 compressor', locationId: 5, classId: 'HVAC.PUMP' },
        { id: 5, name: 'Fan 1', locationId: 5, classId: 'FAN.CEILINGFAN' }
      ];
      const inserts = await trx('equipments').insert(equipments)

      console.log('new equipments saved.')

      const equipmentLinks = [
        { parentId: 2, equipmentId: 3 },
        { parentId: 2, equipmentId: 4 },
      ]
      await trx('equipmentLinks').insert(equipmentLinks);

      console.log('new equipment links saved.')
    })
  } catch (error) {
    // If we get here, that means that neither the 'points' insert,
    // nor any of the command inserts will have taken place.
    console.error(error);
  }
}
