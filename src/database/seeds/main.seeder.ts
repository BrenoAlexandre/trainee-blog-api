import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';
import CategorySeeder from './category.seeder';
import PostSeeder from './post.seeder';
import UserSeeder from './user.seeder';

export default class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    await runSeeder(dataSource, UserSeeder);
    await runSeeder(dataSource, CategorySeeder);
    await runSeeder(dataSource, PostSeeder);
  }
}
