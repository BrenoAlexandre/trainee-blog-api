import { singleton } from 'tsyringe';
import { IUseCase } from '../../../interfaces';
import { IUser } from '../../../models/user.model';
import { UserRepository } from '../../../services/implementation/UserRepository';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class FindUserUseCase implements IUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string): Promise<IUser> {
    const user = await this.userRepository.findUserById(id);

    if (!user) throw CustomError.notFound('User not found');

    return user;
  }
}
