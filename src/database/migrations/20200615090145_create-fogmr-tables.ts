import * as Knex from 'knex';


export async function up(knex: Knex) {
  await knex.schema.createTable('fogmrFunctions', t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.string('name');
    t.string('image');
    t.json('meta');
  });

  await knex.schema.createTable('fogmrTasks', t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.integer('functionId').unsigned().notNullable();
    t.foreign('functionId').references('fogmrFunctions.id').onDelete('RESTRICT');
    t.json('meta');
  });


  await knex.schema.createTable('fogmrReducers', t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.integer('outputDeviceId').unsigned().notNullable();
    t.integer('taskId').unsigned().notNullable();
    t.integer('executorId').unsigned();
    t.boolean('active');
    t.json('meta');

    t.foreign('outputDeviceId').references('devices.id').onDelete('CASCADE');
    t.foreign('taskId').references('fogmrTasks.id').onDelete('CASCADE');
    t.foreign('executorId').references('devices.id').onDelete('CASCADE');
  });

  await knex.schema.createTable('fogmrMappers', t => {
    // this creates an "id" column that gets autoincremented
    t.increments();
    t.integer('inputDeviceId').unsigned().notNullable();
    t.integer('taskId').unsigned().notNullable();
    t.integer('executorId').unsigned();
    t.boolean('active');
    t.json('meta');

    t.foreign('inputDeviceId').references('devices.id').onDelete('CASCADE');
    t.foreign('taskId').references('fogmrTasks.id').onDelete('CASCADE');
    t.foreign('executorId').references('devices.id').onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('fogmrMappers');
  await knex.schema.dropTable('fogmrReducers');
  await knex.schema.dropTable('fogmrTasks');
  await knex.schema.dropTable('fogmrFunctions');
}
