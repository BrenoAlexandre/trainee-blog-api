import { hash } from 'bcrypt';
import config from '../../../config/config';
import User from '../../../database/entities/User.Entity';
import UserRepository from '../../../database/repositories/user.repository';
import { IUseCase } from '../../../interfaces/IUseCase';
import { CustomError } from '../../../utils/customError.util';
import { ICreateUserInput } from './interface';

export class CreateUserUseCase implements IUseCase {
  constructor(private userRepository: typeof UserRepository) {}

  public async execute(
    input: ICreateUserInput
  ): Promise<Omit<User, 'password'>> {
    const { email, password, passwordConfirmation } = input;
    if (!password || password !== passwordConfirmation) {
      throw CustomError.badRequest(`Password confirmation doesn't match.`);
    }

    const passwordHash = await hash(password, config.saltWorkFactor);

    const user = input;
    user.password = passwordHash;

    const emailRegistered = await this.userRepository.findUserByEmail(email);
    if (emailRegistered) throw CustomError.unprocess('Email already in use.');

    const newUser = await this.userRepository.createUser(input);
    return newUser;
  }
}
