import { IUseCase } from '../../../interfaces/IUseCase';
import { CustomError } from '../../../utils/customError.util';
import { IUpdateInput } from './interfaces';
import UserRepository from '../../../database/repositories/user.repository';

export class UpdateUserUseCase implements IUseCase {
  constructor(private userRepository: typeof UserRepository) {}

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
