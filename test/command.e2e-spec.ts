import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CommandController (e2e)', () => {
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


  it('/api/command/ (POST) without point should fail', async () => {
    const response = await request(app.getHttpServer()).post('/api/command').
      send({
        "commandTypeId": "SWITCH",
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });

  it('/api/command/ (POST) without type should fail', async () => {
    const response = await request(app.getHttpServer()).post('/api/command').
      send({
        "point": {
          "locationId": 5,
          "equipmentId": 2
        }
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });

  it('/api/command/ (POST) should succeed', async () => {
    const response = await request(app.getHttpServer()).post('/api/command').
      send({
        "commandTypeId": "SWITCH",
        "point": {
          "locationId": 5
        }
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(201);
  });

  it('/api/command/10/add-point-of-equipment/2 (PUT) should fail', async () => {
    const response = await request(app.getHttpServer()).put('/api/command/10/add-point-of-equipment/2').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/command/1/add-point-of-equipment/2 (PUT) should assign command to equipment', async () => {
    const response = await request(app.getHttpServer()).put('/api/command/1/add-point-of-equipment/2').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });
  it('/api/command/2/add-point-of-equipment/2 (PUT) should assign command to equipment', async () => {
    const response = await request(app.getHttpServer()).put('/api/command/2/add-point-of-equipment/2').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });
  it('/api/command/3/add-point-of-equipment/5 (PUT) should assign command to equipment', async () => {
    const response = await request(app.getHttpServer()).put('/api/command/3/add-point-of-equipment/5').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });
  it('/api/command/4/add-point-of-equipment/5 (PUT) should assign command to equipment', async () => {
    const response = await request(app.getHttpServer()).put('/api/command/4/add-point-of-equipment/5').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });
  it('/api/command/5/add-point-of-equipment/2 (PUT) should assign command to equipment', async () => {
    const response = await request(app.getHttpServer()).put('/api/command/5/add-point-of-equipment/2').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });
  it('/api/command/5/add-point-of-equipment/5 (PUT) should assign command to equipment', async () => {
    const response = await request(app.getHttpServer()).put('/api/command/5/add-point-of-equipment/5').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });
  it('/api/command/5/trigger/1 (PUT) should change setpoints', async () => {
    const response = await request(app.getHttpServer()).put('/api/command/5/trigger/1').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([
      {
        "commandTypeId": "SWITCH",
        "value": 1,
      },
      {
        "commandTypeId": "SWITCH",
        "value": 1,
      }
    ])
  });

  it('/api/equipment/2 (GET) should respond with setpoints and commands', async () => {
    const response = await request(app.getHttpServer()).get('/api/equipment/2').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(
      {
        "id": 2,
        "name": "AC 1",
        "parentId": null,
        "locationId": 5,
        "points": [
          {
            "id": 1,
            "locationId": 5,
            "equipmentId": 2,
            "command": {
              "id": 1,
              "commandTypeId": "SWITCH",
            },
            "setpoint": null
          },
          {
            "id": 2,
            "locationId": 5,
            "equipmentId": 2,
            "command": {
              "id": 2,
              "commandTypeId": "TEMPERATURE",
            },
            "setpoint": null
          },
          {
            "locationId": null,
            "equipmentId": 2,
            "command": null,
            "setpoint": {
              "commandTypeId": "SWITCH",
              "value": 1,
            }
          },
          {
            "locationId": null,
            "equipmentId": 2,
            "command": null,
            "setpoint": {
              "commandTypeId": "TEMPERATURE",
              "value": null,
            }
          }
        ]
      });
  });


  it('/api/command/50/remove-point-of-equipment/5 (DELETE) should not be processable', async () => {
    const response = await request(app.getHttpServer()).delete('/api/command/50/remove-point-of-equipment/5').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/command/5/remove-point-of-equipment/50 (DELETE) should not be processable', async () => {
    const response = await request(app.getHttpServer()).delete('/api/command/5/remove-point-of-equipment/50').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/command/1/remove-point-of-equipment/5 (DELETE) should not be processable', async () => {
    const response = await request(app.getHttpServer()).delete('/api/command/1/remove-point-of-equipment/5').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/command/5/remove-point-of-equipment/5 (DELETE) should remove link', async () => {
    const response = await request(app.getHttpServer()).delete('/api/command/5/remove-point-of-equipment/5').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });

  it('/api/command/5 (DELETE) should delete command', async () => {
    const response = await request(app.getHttpServer()).delete('/api/command/5').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });

});
