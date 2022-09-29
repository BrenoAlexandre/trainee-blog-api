import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { omit } from 'lodash';
import config from '../../config/config';
import User from '../../database/entities/User.Entity';
import UserRepository from '../../database/repositories/UserRepository';

interface ICreateUserInput {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}

interface ILoginInput {
  email: string;
  password: string;
}

export async function createUser(
  input: ICreateUserInput
): Promise<Omit<User, 'password'>> {
  const { email, password, passwordConfirmation } = input;
  const repository = new UserRepository();

  if (!password || password !== passwordConfirmation) {
    throw new Error(`Password confirmation doesn't match.`);
  }

  const passwordHash = await hash(password, config.saltWorkFactor);

  const user = input;
  user.password = passwordHash;

  const emailRegistered = await repository.findUserByEmail(email);

  if (emailRegistered) throw new Error('Email already in use.');

  const newUser = await repository.createUser(input);
  return newUser;
}

export async function validateLogin(input: ILoginInput) {
  const { email, password } = input;
  const repository = new UserRepository();

  const user = await repository.findUserByEmail(email);

  if (!user) throw new Error('Incorrect login');

  const isPasswordCorrect = await compare(password, user.password);

  if (!isPasswordCorrect) throw new Error('Incorrect login');

  const secureUser = omit(user, 'password');
  const token = sign(secureUser, config.jwtSecret, {
    expiresIn: config.accessTokenTtl,
  });
  const refreshToken = sign(secureUser, config.jwtSecret, {
    expiresIn: config.refreshTokenTtl,
  });

  return { token, refreshToken };
}
