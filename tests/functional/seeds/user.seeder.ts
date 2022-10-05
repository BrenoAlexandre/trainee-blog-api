import { hash } from 'bcrypt';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import User from '../../../src/database/entities/User.Entity';
import config from '../../../src/config/config';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(User);

    const data = {
      name: 'admin',
      email: 'admin@mail.com',
      password: 'admin123',
      role: 'admin',
    };

    const hashPassword = await hash(data.password, config.saltWorkFactor);
    data.password = hashPassword;

    const userExists = await repository.findOneBy({ email: data.email });

    if (!userExists) {
      const newUser = repository.create(data);
      await repository.save(newUser);
    }
  }
}
