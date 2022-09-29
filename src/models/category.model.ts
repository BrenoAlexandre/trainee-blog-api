import User from '../database/entities/User.Entity';

export interface ICategory {
  id: string;
  title: string;
  owner: User;
}

export interface ICreateCategory {
  title: string;
  owner: Omit<User, 'password'>;
}
