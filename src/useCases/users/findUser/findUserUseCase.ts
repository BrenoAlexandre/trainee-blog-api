import { singleton } from 'tsyringe';
import { EErrorMessages, IUseCase } from '../../../interfaces';
import { IUser } from '../../../models/user.model';
import { UserService } from '../../../services/implementation/UserService';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class FindUserUseCase implements IUseCase {
  constructor(private userRepository: UserService) {}

  public async execute(id: string): Promise<IUser> {
    const user = await this.userRepository.findUserById(id);

    if (!user)
      throw CustomError.notFound(EErrorMessages.USER_NOT_FOUND, {
        message: 'User not found',
      });

    return user;
  }
}
