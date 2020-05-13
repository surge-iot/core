import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('EquipmentController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }));
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });


  // Be sure to seed the db first
  it('/api/equipment/2 (GET) should succeed', async () => {
    const response = await request(app.getHttpServer()).get('/api/equipment/2').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(
      {
        "id": 2,
        "name": "AC 1",
        "classId": "HVAC.TERMINALUNIT",
        "parentId": null,
        "locationId": 5,
        "children": [
          {
            "id": 3,
            "name": "AC 1 blower",
            "classId": "HVAC.TERMINALUNIT.FANCOILUNIT",
            "parentId": 2,
            "locationId": 5,
          },
          {
            "id": 4,
            "name": "AC 1 compressor",
            "classId": "HVAC.PUMP",
            "parentId": 2,
            "locationId": 5,
          }
        ],
        "location": {
          "id": 5,
          "name": "Room 2",
          "classId": "ROOM",
          "parentId": 2,
        },
        "links": [],
        "points": [
          {
            "id": 3,
            "classId": "SENSOR.THI.TEMPERATURE",
            "locationId": 5,
            "equipmentId": 2,
          },
          {
            "id": 4,
            "classId": "COMMAND.SWITCH",
            "locationId": 5,
            "equipmentId": 2,
          },
          {
            "id": 5,
            "classId": "COMMAND.TEMPERATURE",
            "locationId": 5,
            "equipmentId": 2,
          },
          {
            "id": 8,
            "classId": "SETPOINT.SWITCH",
            "locationId": 5,
            "equipmentId": 2,
          },
          {
            "id": 9,
            "classId": "SETPOINT.TEMPERATURE",
            "locationId": 5,
            "equipmentId": 2,
          }
        ]
      });
  });

  // Be sure to seed the db first
  it('/api/equipment?locationId=1 (GET) should succeed', async () => {
    const response = await request(app.getHttpServer()).get('/api/equipment?locationId=1').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(
      [
        {
          "id": 1,
          "name": "ODU",
          "classId": "HVAC.ODU",
          "parentId": null,
          "locationId": 1
        }
      ]);
  });

  it('/api/equipment/1 (PUT) should update', async () => {
    const response = await request(app.getHttpServer()).put('/api/equipment/1').
      send({
        "name": "Lab ODU"
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });


  it('/api/equipment/1/add-link/20 (PUT) should not be processable', async () => {
    const response = await request(app.getHttpServer()).put('/api/equipment/1/add-link/20').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/equipment/10/add-link/2 (PUT) should not be processable', async () => {
    const response = await request(app.getHttpServer()).put('/api/equipment/10/add-link/2').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/equipment/1/add-link/2 (PUT) should add link', async () => {
    const response = await request(app.getHttpServer()).put('/api/equipment/1/add-link/2').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });


  it('/api/equipment/10/remove-link/2 (DELETE) should not be processable', async () => {
    const response = await request(app.getHttpServer()).delete('/api/equipment/10/remove-link/2').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/equipment/1/remove-link/20 (DELETE) should not be processable', async () => {
    const response = await request(app.getHttpServer()).delete('/api/equipment/1/remove-link/20').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/equipment/1/remove-link/3 (DELETE) should not be processable', async () => {
    const response = await request(app.getHttpServer()).delete('/api/equipment/1/remove-link/3').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/equipment/1/remove-link/2 (DELETE) should remove link', async () => {
    const response = await request(app.getHttpServer()).delete('/api/equipment/1/remove-link/2').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });


  it('/api/equipment/ (POST) without location should fail', async () => {
    const response = await request(app.getHttpServer()).post('/api/equipment').
      send({
        "name": 'Fan 2'
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });


  it('/api/equipment/ (POST) should succeed', async () => {
    const response = await request(app.getHttpServer()).post('/api/equipment').
      send({
        "name": "Fan 2",
        "locationId": 5, 
        "classId": 'FAN.CEILINGFAN'
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(201);
  });

  it('/api/equipment/4 (DELETE) should delete', async () => {
    const response = await request(app.getHttpServer()).delete('/api/equipment/4').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });

});
