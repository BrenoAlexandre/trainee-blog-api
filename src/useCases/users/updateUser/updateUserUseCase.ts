import { singleton } from 'tsyringe';
import { EErrorMessages, IUseCase } from '../../../interfaces';
import { CustomError } from '../../../utils/customError.util';
import { IUpdateInput } from './interfaces';
import { UserService } from '../../../services/implementation/UserService';

@singleton()
export class UpdateUserUseCase implements IUseCase {
  constructor(private userRepository: UserService) {}

  public async execute(input: IUpdateInput): Promise<void> {
    const { name, user } = input;
    const { id } = user;

    if (user.name === name) return;

    const updatedUser = await this.userRepository.updateUserName(
      id.toString(),
      name
    );

    if (!updatedUser)
      throw CustomError.notFound(EErrorMessages.USER_NOT_FOUND, {
        message: 'User not found',
      });
  }
}
