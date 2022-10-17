import User from '../database/entities/User.Entity';
import userRepository from '../database/repositories/user.repository';
import { CustomError } from '../utils/customError.util';

interface IUpdateInput {
  name: string;
  user: User;
}

export async function findUser(id: string): Promise<Omit<User, 'password'>> {
  const user = await userRepository.findUserById(id);

  if (!user) throw CustomError.notFound('User not found');

  return user;
}

export async function updateUser(input: IUpdateInput): Promise<void> {
  const { name, user } = input;
  const { id } = user;

  if (user.name === name) return;

  const updatedUser = await userRepository.updateUserName(id.toString(), name);

  if (!updatedUser) throw CustomError.notFound('User not found');
}
