import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import User from '../entities/User.Entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(User);
    await repository.insert([
      {
        name: 'admin',
        email: 'admin@mail.com',
        password: 'admin123',
        role: 'admin',
      },
      {
        name: 'john doe',
        email: 'user@mail.com',
        password: '123123',
        role: 'user',
      },
    ]);

    const userFactory = factoryManager.get(User);
    await userFactory.save();

    await userFactory.saveMany(5);
  }
}
