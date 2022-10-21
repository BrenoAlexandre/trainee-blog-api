import { Request } from 'express';
import User from '../database/entities/User.Entity';

export interface IAuthRequest extends Request {
  user: Omit<User, 'password'> & { iat: number; exp: number };
}
