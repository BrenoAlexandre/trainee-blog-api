import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { omit } from 'lodash';
import { singleton } from 'tsyringe';
import config from '../../../config/config';
import User from '../../../database/entities/User.Entity';
import { IUseCase } from '../../../interfaces';
import { UserRepository } from '../../../services/implementation/UserRepository';
import { CustomError } from '../../../utils/customError.util';
import { ILoginInput } from './interfaces';

@singleton()
export class LoginUseCase implements IUseCase {
  constructor(private userRepository: UserRepository) {}

  private async getUser(input: ILoginInput): Promise<User> {
    const { email } = input;

    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw CustomError.badRequest('Incorrect login');

    return user;
  }

  private async validate(user: User, password: string) {
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) throw CustomError.badRequest('Incorrect login');

    return user;
  }

  public async execute(input: ILoginInput) {
    const user = await this.getUser(input);

    this.validate(user, input.password);

    const secureUser = omit(user, 'password');
    const token = sign(secureUser, config.jwtSecret, {
      expiresIn: config.accessTokenTtl,
    });
    const refreshToken = sign(secureUser, config.jwtSecret, {
      expiresIn: config.refreshTokenTtl,
    });

    return { token, refreshToken };
  }
}
