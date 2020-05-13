import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PointController (e2e)', () => {
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


  it('/api/point/ (POST) without location should fail', async () => {
    const response = await request(app.getHttpServer()).post('/api/point').
      send({
        "classId": "COMMAND.SWITCH",
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(400);
  });

  it('/api/point/ (POST) should succeed', async () => {
    const response = await request(app.getHttpServer()).post('/api/point').
      send({
        "classId": "COMMAND.SWITCH",
        "locationId":5
      }).
      set('Accept', 'application/json');
    expect(response.status).toBe(201);
  });

  it('/api/point/1/add-point-of-equipment/20 (PUT) should fail', async () => {
    const response = await request(app.getHttpServer()).put('/api/point/1/add-point-of-equipment/20').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/point/1/add-point-of-equipment/2 (PUT) should assign point to equipment', async () => {
    const response = await request(app.getHttpServer()).put('/api/point/1/add-point-of-equipment/2').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });


  it('/api/point/50/remove-point-of-equipment/5 (DELETE) should not be processable', async () => {
    const response = await request(app.getHttpServer()).delete('/api/point/50/remove-point-of-equipment/5').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/point/5/remove-point-of-equipment/50 (DELETE) should not be processable', async () => {
    const response = await request(app.getHttpServer()).delete('/api/point/5/remove-point-of-equipment/50').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/point/1/remove-point-of-equipment/5 (DELETE) should not be processable', async () => {
    const response = await request(app.getHttpServer()).delete('/api/point/1/remove-point-of-equipment/5').
      set('Accept', 'application/json');
    expect(response.status).toBe(422);
  });

  it('/api/point/1/remove-point-of-equipment/2 (DELETE) should remove link', async () => {
    const response = await request(app.getHttpServer()).delete('/api/point/1/remove-point-of-equipment/2').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });

  it('/api/point/3 (DELETE) should delete point', async () => {
    const response = await request(app.getHttpServer()).delete('/api/point/3').
      set('Accept', 'application/json');
    expect(response.status).toBe(200);
  });

});
