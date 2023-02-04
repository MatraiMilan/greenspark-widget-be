import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { InMemoryWidgets } from "../src/repository/data/in-memory-widgets";

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/widgets (GET)', () => {
    return request(app.getHttpServer())
      .get('/widgets')
      .expect(200)
      .expect([...InMemoryWidgets]);
  });

  it(':id/active (PUT)', () => {
      return request(app.getHttpServer())
          .put('/widgets/1/active')
          .send({
            active: true
          })
          .expect(200);
  });

  it(':id/color (PUT)', () => {
    return request(app.getHttpServer())
        .put('/widgets/1/color')
        .send({
          selectedColor: 'black'
        })
        .expect(200);
  });

  it(':id/linked (PUT)', () => {
    return request(app.getHttpServer())
        .put('/widgets/1/linked')
        .send({
          linked: true
        })
        .expect(200);
  });
});
