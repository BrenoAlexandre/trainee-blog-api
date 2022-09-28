import { getRepository } from 'typeorm';
import UserEntity from '../database/entities/User.Entity';
import { UserInput } from '../models/user.model';

export async function createUser(input: UserInput) {
  const repository = getRepository(UserEntity);
  const newUser = repository.create(input);
  await repository.save(newUser);
  return newUser;
}
