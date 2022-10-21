// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';
import User from '../../database/entities/User.Entity';

declare namespace express {
  interface Request {
    user: Omit<typeof User, 'password'> & { iat: number; exp: number };
  }
}
