import User from '../../../database/entities/User.Entity';
import UserRepository from '../../../database/repositories/user.repository';
import { CustomError } from '../../../utils/customError.util';

export class FindUserUseCase {
  constructor(private userRepository: typeof UserRepository) {}

  public async execute(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findUserById(id);

    if (!user) throw CustomError.notFound('User not found');

    return user;
  }
}
