import { hash } from 'bcrypt';
import { singleton } from 'tsyringe';
import config from '../../../config/config';
import { IUseCase } from '../../../interfaces';
import { CustomError } from '../../../utils/customError.util';
import { UserRepository } from '../../../services/implementation/UserRepository';
import { RequestDTO } from './RequestDTO';
import { ResponseDTO } from './ResponseDTO';

@singleton()
export class CreateUserUseCase implements IUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(input: RequestDTO): Promise<ResponseDTO> {
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
