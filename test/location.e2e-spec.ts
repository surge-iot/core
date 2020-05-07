import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('LocationController (e2e)', () => {
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

  it('/api/location/ (POST) without name should fail', async () => {
    const response = await request(app.getHttpServer()).post('/api/location').
      send({
        "isPartOfId": 1
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });
  it('/api/location/ (POST) should succeed', async () => {
    const response = await request(app.getHttpServer()).post('/api/location').
      send({
        "name": "Room 2"
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(201);
  });
  // Be sure to seed the db first
  it('/api/location/2 (GET) should succeed', async () => {
    const response = await request(app.getHttpServer()).get('/api/location/2').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(
      {
        "id": 2,
        "name": "Floor 1",
        "isPartOfId": 1,
        "meta": null,
        "children": [
          {
            "id": 4,
            "name": "Room 1",
            "isPartOfId": 2,
            "meta": null,
          }
        ],
        "links": []
      });
  });

  // Be sure to seed the db first
  it('/api/location/3 (GET) should succeed', async () => {
    const response = await request(app.getHttpServer()).get('/api/location/3').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(
      {
        "id": 3,
        "name": "Wing 1",
        "isPartOfId": 1,
        "meta": null,
        "children": [],
        "links": [
          {
            "id": 4,
            "name": "Room 1",
            "isPartOfId": 2,
            "meta": null,
          }
        ]
      });
  });

});
