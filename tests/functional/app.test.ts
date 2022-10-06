import supertest from 'supertest';
import app from '../../src/app';
import { connection } from '../db';

beforeAll(async () => connection.create());

afterAll(async () => connection.close());

describe('App', () => {
  it('should return hello world', async () => {
    const res = await supertest(app).get('/api/healthcheck');
    expect(res.status).toBe(200);
    expect(res.text).toBe('OK');
  });
});
