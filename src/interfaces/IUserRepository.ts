import User from '../database/entities/User.Entity';
import { ICreateUser, IUser } from '../models/user.model';

export interface IUserRepository {
  createUser: (data: ICreateUser) => Promise<IUser>;
  findUserById: (id: string) => Promise<IUser | null>;
  findUserByEmail: (email: string) => Promise<User | null>;
  updateUserName(id: string, name: string): Promise<boolean>;
  deleteUser(id: string): Promise<void>;
}
