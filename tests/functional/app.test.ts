import supertest from 'supertest';
import app from '../../src/app';
import { createDb, closeDb } from '../../src/database/dataSource';

beforeAll(async () => {
  await createDb();
});

afterAll(async () => {
  await closeDb();
});

describe('App', () => {
  describe('Login', () => {
    it('should be able to login as admin', async () => {
      const { status, header } = await supertest(app)
        .post('/api/v1/user/login')
        .send({ email: 'admin@mail.com', password: 'admin123' });

      expect(status).toBe(204);
      expect(header).toHaveProperty('authorization');
    });

    it('should not be able to login as admin', async () => {
      const { status, body } = await supertest(app)
        .post('/api/v1/user/login')
        .send({ email: 'adm@mail.com', password: '123123' });

      expect(status).toBe(422);
      expect(body.message).toEqual('INVALID_OPERATION');
    });
  });
});
