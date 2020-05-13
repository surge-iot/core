import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('LocationClassController (e2e)', () => {
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
  it('/api/location-class/ROOM (GET) should succeed', async () => {
    const response = await request(app.getHttpServer()).get('/api/location-class/ROOM').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(
      {
        "id": "ROOM",
        "name": "Room",
        "parentId": null,
    });
  });

  it('/api/location-class/ (POST) without name should fail', async () => {
    const response = await request(app.getHttpServer()).post('/api/location-class').
      send({
        "parentId": 'BUILDING'
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });


  it('/api/location-class/ (POST) should succeed', async () => {
    const response = await request(app.getHttpServer()).post('/api/location-class').
      send({
        "name":"Wing",
        "parentId":"BUILDING"
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(201);
  });

  it('/api/location-class/BUILDING.WING (DELETE) should delete', async () => {
    const response = await request(app.getHttpServer()).delete('/api/location-class/BUILDING.WING').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });

});
