import supertest from 'supertest';
import app from '../../src/app';
import db from '../db';

beforeAll(async () => {
  await db.create();
});

afterAll(async () => {
  await db.close();
});

describe('App', () => {
  it('should return hello world', async () => {
    const { text, status } = await supertest(app).get('/');
    expect(status).toBe(200);
    expect(text).toBe('Hello world');
  });
});
