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


  // Be sure to seed the db first
  it('/api/location/2 (GET) should succeed', async () => {
    const response = await request(app.getHttpServer()).get('/api/location/2').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(
      {
        "id": 2,
        "name": "Floor 1",
        "classId": "FLOOR",
        "parentId": 1,
        "children": [
          {
            "id": 4,
            "name": "Room 1",
            "classId": "ROOM",
            "parentId": 2,
          },
          {
            "id": 5,
            "name": "Room 2",
            "classId": "ROOM",
            "parentId": 2,
          }
        ],
        "links": []
      });
  });


  // Be sure to seed the db first
  it('/api/location/?parentId=1 (GET) should return children of 1', async () => {
    const response = await request(app.getHttpServer()).get('/api/location/?parentId=1').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(
      [
        {
          "id": 2,
          "name": "Floor 1",
          "classId": "FLOOR",
          "parentId": 1,
        },
        {
          "id": 3,
          "name": "Wing 1",
          "classId": "WING",
          "parentId": 1,
        }
      ]);
  });


  it('/api/location/4 (PUT) should update', async () => {
    const response = await request(app.getHttpServer()).put('/api/location/4').
      send({
        "name": "Awesome room 1"
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });

  it('/api/location/24/add-link/4 (PUT) should not be processable', async () => {
    const response = await request(app.getHttpServer()).put('/api/location/24/add-link/4').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/location/1/add-link/14 (PUT) should not be processable', async () => {
    const response = await request(app.getHttpServer()).put('/api/location/1/add-link/14').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/location/1/add-link/4 (PUT) should add link', async () => {
    const response = await request(app.getHttpServer()).put('/api/location/1/add-link/4').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });



  it('/api/location/10/remove-link/4 (DELETE) should not be processable', async () => {
    const response = await request(app.getHttpServer()).delete('/api/location/10/remove-link/4').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/location/1/remove-link/40 (DELETE) should not be processable', async () => {
    const response = await request(app.getHttpServer()).delete('/api/location/1/remove-link/40').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/location/1/remove-link/2 (DELETE) should not be processable', async () => {
    const response = await request(app.getHttpServer()).delete('/api/location/1/remove-link/2').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/location/1/remove-link/4 (DELETE) should remove link', async () => {
    const response = await request(app.getHttpServer()).delete('/api/location/1/remove-link/4').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });


  it('/api/location/ (POST) without name should fail', async () => {
    const response = await request(app.getHttpServer()).post('/api/location').
      send({
        "parentId": 1
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });


  it('/api/location/ (POST) should succeed', async () => {
    const response = await request(app.getHttpServer()).post('/api/location').
      send({
        "name": "Room 2",
        "classId": "ROOM"
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(201);
  });

  it('/api/location/4 (DELETE) should delete', async () => {
    const response = await request(app.getHttpServer()).delete('/api/location/4').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });

});
