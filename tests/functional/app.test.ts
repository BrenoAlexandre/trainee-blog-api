import supertest from 'supertest';
import app from '../../src/app';
import { connection } from '../db';

beforeAll(async () => {
  await connection.create();
  await connection.seed();
  await connection.close();
});

beforeEach(async () => {
  await connection.create();
});

afterEach(async () => {
  await connection.close();
});

afterAll(async () => {
  await connection.create();
  await connection.clean();
  await connection.close();
});

describe('App', () => {
  describe('Login', () => {
    it('should be able to login as admin', async () => {
      const res = await supertest(app)
        .post('/api/v1/user/login')
        .send({ email: 'admin@mail.com', password: 'admin123' });

      expect(res.status).toBe(204);
      expect(res.header).toHaveProperty('authorization');
    });
  });
});
