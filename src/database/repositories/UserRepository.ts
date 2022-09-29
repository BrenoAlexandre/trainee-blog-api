import { EntityRepository, Repository } from 'typeorm';
import { ICreateUser } from '../../models/user.model';
import User from '../entities/User.Entity';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async createUser(data: ICreateUser): Promise<User> {
    const user = this.create(data);
    const newUser = await this.save(user);
    return newUser;
  }

  public async findUserById(id: string): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) return null;
    return user;
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.findOne({ email });
    if (!user) return null;
    return user;
  }

  public async updateUserName(
    id: string,
    newName: string
  ): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) return null;
    user.name = newName;
    const updatedUser = await this.save(user);
    return updatedUser;
  }

  public async deleteUser(id: string): Promise<void> {
    await this.delete(id);
  }
}

export default UserRepository;
