import { singleton } from 'tsyringe';
import { IUseCase } from '../../../interfaces/IUseCase';
import { CustomError } from '../../../utils/customError.util';
import { IUserRepository } from '../../../interfaces';
import { IUpdateInput } from './interfaces';

@singleton()
export class UpdateUserUseCase implements IUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async execute(input: IUpdateInput): Promise<void> {
    const { name, user } = input;
    const { id } = user;

    if (user.name === name) return;

    const updatedUser = await this.userRepository.updateUserName(
      id.toString(),
      name
    );

    if (!updatedUser) throw CustomError.notFound('User not found');
  }
}
