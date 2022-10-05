import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { omit } from 'lodash';
import config from '../config/config';
import User from '../database/entities/User.Entity';
import userRepository from '../database/repositories/user.repository';
import { CustomError } from '../utils/customError.util';

interface ICreateUserInput {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}

interface IUpdateInput {
  name: string;
  user: User;
}

interface ILoginInput {
  email: string;
  password: string;
}

export async function createUser(
  input: ICreateUserInput
): Promise<Omit<User, 'password'>> {
  const { email, password, passwordConfirmation } = input;
  if (!password || password !== passwordConfirmation) {
    throw CustomError.badRequest(`Password confirmation doesn't match.`);
  }

  const passwordHash = await hash(password, config.saltWorkFactor);

  const user = input;
  user.password = passwordHash;

  const emailRegistered = await userRepository.findUserByEmail(email);
  if (emailRegistered) throw CustomError.unprocess('Email already in use.');

  const newUser = await userRepository.createUser(input);
  return newUser;
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

export async function validateLogin(input: ILoginInput) {
  const { email, password } = input;
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new Error('Incorrect login');

  const isPasswordCorrect = await compare(password, user.password);
  if (!isPasswordCorrect) throw CustomError.badRequest('Incorrect login');

  const secureUser = omit(user, 'password');
  const token = sign(secureUser, config.jwtSecret, {
    expiresIn: config.accessTokenTtl,
  });
  const refreshToken = sign(secureUser, config.jwtSecret, {
    expiresIn: config.refreshTokenTtl,
  });

  return { token, refreshToken };
}
