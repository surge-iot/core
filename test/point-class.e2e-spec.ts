import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PointClassController (e2e)', () => {
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
  it('/api/point-class/?parentId=SENSOR (GET) should succeed', async () => {
    const response = await request(app.getHttpServer()).get('/api/point-class/?parentId=SENSOR').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(
      [
        {
          "id": "SENSOR.OCCUPANCY",
          "name": "Occupancy",
          "parentId": "SENSOR",
        },
        {
          "id": "SENSOR.POWER",
          "name": "Power Meter",
          "parentId": "SENSOR",
        },
        {
          "id": "SENSOR.THI",
          "name": "Temperature, Humidity, Irradiance",
          "parentId": "SENSOR",
        }
      ]);
  });

  it('/api/point-class/ (POST) without name should fail', async () => {
    const response = await request(app.getHttpServer()).post('/api/point-class').
      send({
        "parentId": 'SENSOR'
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });


  it('/api/point-class/ (POST) should succeed', async () => {
    const response = await request(app.getHttpServer()).post('/api/point-class').
      send({
        "name": "AQI",
        "parentId": "SENSOR"
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(201);
  });

  it('/api/point-class/SENSOR.AQI (DELETE) should delete', async () => {
    const response = await request(app.getHttpServer()).delete('/api/point-class/SENSOR.AQI').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });

});
