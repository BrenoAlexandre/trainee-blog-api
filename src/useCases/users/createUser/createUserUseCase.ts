import { hash } from 'bcrypt';
import { singleton } from 'tsyringe';
import config from '../../../config/config';
import { EErrorMessages, IUseCase } from '../../../interfaces';
import { CustomError } from '../../../utils/customError.util';
import { UserService } from '../../../services/implementation/UserService';
import { CreateUserRequestDTO } from './CreateUserRequestDTO';
import { CreateUserResponseDTO } from './CreateUserResponseDTO';

@singleton()
export class CreateUserUseCase implements IUseCase {
  constructor(private userRepository: UserService) {}

  public async execute(
    input: CreateUserRequestDTO
  ): Promise<CreateUserResponseDTO> {
    const { email, password, passwordConfirmation } = input;
    if (!password || password !== passwordConfirmation) {
      throw CustomError.unprocessable(EErrorMessages.WRONG_CREDENTIALS, {
        message: `Password confirmation doesn't match`,
      });
    }

    const passwordHash = await hash(password, config.saltWorkFactor);

    const user = input;
    user.password = passwordHash;

    const emailRegistered = await this.userRepository.findUserByEmail(email);
    if (emailRegistered)
      throw CustomError.unprocessable(EErrorMessages.WRONG_CREDENTIALS, {
        message: 'Email already in use',
      });

    const newUser = await this.userRepository.createUser(input);
    return newUser;
  }
}
