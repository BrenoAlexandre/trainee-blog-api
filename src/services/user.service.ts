import { getRepository } from 'typeorm';
import UserEntity from '../database/entities/User.Entity';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}

export async function createUser(input: ICreateUser) {
  const { password, passwordConfirmation } = input;
  const repository = getRepository(UserEntity);

  if (password !== passwordConfirmation) {
    throw new Error(`Password confirmation doesn't match`);
  }

  const newUser = repository.create(input);

  await repository.save(newUser);
  return newUser;
}
