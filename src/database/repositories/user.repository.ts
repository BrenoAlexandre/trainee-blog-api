import { AppDataSource } from '../ormconfig';
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
      .where('id = :id', { id })
      .getOne();
    return user;
  },
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.createQueryBuilder('user')
      .where('email = :email', { email })
      .getOne();
    return user;
  },
  async updateUserName(id: string, newName: string): Promise<boolean> {
    const updateResult = await this.createQueryBuilder('user')
      .update(User)
      .set({ name: newName })
      .where('id = :id', { id })
      .execute();

    return !!updateResult;
  },
  async deleteUser(id: string): Promise<void> {
    await this.delete(id);
  },
});

export default userRepository;
