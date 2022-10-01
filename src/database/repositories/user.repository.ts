import { omit } from 'lodash';
import AppDataSource from '../dataSource';
import { ICreateUser } from '../../models/user.model';
import User from '../entities/User.Entity';

const userRepository = AppDataSource.getRepository(User).extend({
  async createUser(data: ICreateUser): Promise<Omit<User, 'password'>> {
    const user = this.create(data);
    const newUser = await this.save(user);
    return newUser;
  },
  async findUserById(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .select(['user.id', 'user.name'])
      .getOne();
    return omit(user, ['password']);
  },
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  },
  async updateUserName(id: string, name: string): Promise<boolean> {
    const updateResult = await this.createQueryBuilder('user')
      .update(User)
      .set({ name })
      .where('user.id = :id', { id })
      .execute();

    return !!updateResult;
  },
  async deleteUser(id: string): Promise<void> {
    await this.delete(id);
  },
});

export default userRepository;
