import UserRepository from '../../database/repositories/UserRepository';

interface ICreateUserInput {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}

export async function createUser(input: ICreateUserInput) {
  const { email, password, passwordConfirmation } = input;
  const repository = new UserRepository();

  if (password !== passwordConfirmation) {
    throw new Error(`Password confirmation doesn't match.`);
  }

  const emailRegistered = await repository.findUserByEmail(email);

  if (emailRegistered) throw new Error('Email already in use.');

  const newUser = await repository.createUser(input);
  return newUser;
}
