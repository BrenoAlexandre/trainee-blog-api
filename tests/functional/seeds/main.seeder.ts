import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import CategorySeeder from './category.seeder';
import PostSeeder from './post.seeder';
import UserSeeder from './user.seeder';

export default class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    await runSeeders(dataSource, {
      seeds: [UserSeeder, CategorySeeder, PostSeeder],
    });
  }
}
