import { userRepository } from '../../database/repositories/user.repository';
import { ICreateUser, IUser } from '../../models/user.model';
import { IUserRepository } from '../../interfaces/IUserRepository';
import User from '../../database/entities/User.Entity';

export class UserService implements IUserRepository {
  public createUser = async (data: ICreateUser): Promise<IUser> => {
    const newUser = await userRepository.createUser(data);
    return newUser;
  };

  public findUserById = async (id: string): Promise<IUser | null> => {
    const user = await userRepository.findUserById(id);
    return user;
  };

  public findUserByEmail = async (email: string): Promise<User | null> => {
    const user = await userRepository.findUserByEmail(email);
    return user;
  };

  public updateUserName = async (
    id: string,
    name: string
  ): Promise<boolean> => {
    const updated = await userRepository.updateUserName(id, name);
    return !!updated;
  };

  public deleteUser = async (id: string): Promise<void> => {
    await userRepository.deleteUser(id);
  };
}
