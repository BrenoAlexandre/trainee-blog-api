import { pick } from 'lodash';
import AppDataSource from '../dataSource';
import { ICreateUser, IUser } from '../../models/user.model';
import User from '../entities/User.Entity';

export const userRepository = AppDataSource.getRepository(User).extend({
  async createUser(data: ICreateUser): Promise<IUser> {
    const user = this.create(data);
    const newUser = await this.save(user);
    return pick(newUser, ['id', 'name', 'email', 'role']);
  },
  async findUserById(id: string): Promise<IUser | null> {
    const user = await this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .select(['user.id', 'user.name', 'user.email', 'user.role'])
      .getOne();
    return user ? pick(user, ['id', 'name', 'email', 'role']) : null;
  },
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  },
  async updateUserName(id: string, name: string): Promise<boolean> {
    const updateResult = await this.createQueryBuilder()
      .update({ name })
      .where({ id })
      .execute();

    return !!updateResult;
  },
  async deleteUser(id: string): Promise<void> {
    await this.delete(id);
  },
});
