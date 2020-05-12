import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  try {
    await knex.transaction(async trx => {
      await knex('equipments').del();
      await knex('equipmentLinks').del();
      const equipments = [
        { id: 1, name: 'ODU', parentId: null, locationId: 1, classId: 'HVAC.ODU' },
        { id: 2, name: 'AC 1', parentId: null, locationId: 5, classId: 'HVAC.TERMINALUNIT' },
        { id: 3, name: 'AC 1 blower', parentId: 2, locationId: 5, classId: 'HVAC.TERMINALUNIT.FANCOILUNIT' },
        { id: 4, name: 'AC 1 compressor', parentId: 2, locationId: 5, classId: 'HVAC.PUMP' },
        { id: 5, name: 'Fan 1', parentId: null, locationId: 5, classId: 'FAN.CEILINGFAN' }
      ];
      const inserts = await trx('equipments').insert(equipments)

      console.log(inserts.length + ' new equipments saved.')
    })
  } catch (error) {
    // If we get here, that means that neither the 'points' insert,
    // nor any of the command inserts will have taken place.
    console.error(error);
  }
}
