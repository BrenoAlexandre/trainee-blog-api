import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import Category from '../entities/Category.Entity';
import User from '../entities/User.Entity';

export default class CategorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(Category);
    const userRepository = dataSource.getRepository(User);

    const categoryOwner = await userRepository.findOneBy({
      email: 'admin@mail.com',
    });

    const data = {
      title: 'Administração',
      owner: categoryOwner?.id.toString(),
    };

    const categoryExists = await repository.findOneBy({ title: data.title });

    if (!categoryExists) {
      const newCategory = repository.create(data);
      await repository.save(newCategory);
    }
  }
}
