import { singleton } from 'tsyringe';
import { IUserRepository } from '../../../interfaces';
import { IUser } from '../../../models/user.model';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class FindUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(id: string): Promise<IUser> {
    const user = await this.userRepository.findUserById(id);

    if (!user) throw CustomError.notFound('User not found');

    return user;
  }
}
