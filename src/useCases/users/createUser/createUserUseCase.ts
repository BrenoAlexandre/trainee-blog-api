import { hash } from 'bcrypt';
import { singleton } from 'tsyringe';
import config from '../../../config/config';
import { CustomError } from '../../../utils/customError.util';
import { IUseCase, IUserRepository } from '../../../interfaces';
import { ICreateUserInput } from './interface';
import { IUser } from '../../../models/user.model';

@singleton()
export class CreateUserUseCase implements IUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(input: ICreateUserInput): Promise<IUser> {
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
