import userRepository from '../database/repositories/user.repository';
// import { Repository } from 'typeorm';
// import User from '../database/entities/User.Entity';
// import { ICreateUser } from '../models/user.model';

export type IUserRepository = typeof userRepository;

// extends Repository<User> {
//   createUser(data: ICreateUser): Promise<Omit<User, 'password'>>;
//   findUserById(id: string): Promise<Omit<User, 'password'> | null>;
//   findUserByEmail(email: string): Promise<User | null>;
//   updateUserName(id: string, name: string): Promise<boolean>;
//   deleteUser(id: string): Promise<void>;
// }
