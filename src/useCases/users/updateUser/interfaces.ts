import User from '../../../database/entities/User.Entity';

export interface IUpdateInput {
  name: string;
  user: Omit<User, 'password'>;
}
