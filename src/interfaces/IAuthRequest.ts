import { Request } from 'express';
import User from '../database/entities/User.Entity';

export interface IAuthRequest extends Request {
  user: User & { iat: number; exp: number };
}
