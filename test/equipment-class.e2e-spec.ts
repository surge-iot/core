import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('EquipmentClassController (e2e)', () => {
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
  it('/api/equipment-class/FAN.CEILINGFAN (GET) should succeed', async () => {
    const response = await request(app.getHttpServer()).get('/api/equipment-class/FAN.CEILINGFAN').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(
      {
        "id": "FAN.CEILINGFAN",
        "name": "Ceiling Fan",
        "parentId": "FAN",
    });
  });

  it('/api/equipment-class/ (POST) without name should fail', async () => {
    const response = await request(app.getHttpServer()).post('/api/equipment-class').
      send({
        "parentId": 'LIGHTINGSYSTEM'
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });


  it('/api/equipment-class/ (POST) should succeed', async () => {
    const response = await request(app.getHttpServer()).post('/api/equipment-class').
      send({
        "name":"Bulb",
        "parentId":"LIGHTINGSYSTEM"
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(201);
  });

  it('/api/equipment-class/LIGHTINGSYSTEM.BULB (DELETE) should delete', async () => {
    const response = await request(app.getHttpServer()).delete('/api/equipment-class/LIGHTINGSYSTEM.BULB').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });

});
