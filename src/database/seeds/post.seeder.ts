import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import Category from '../entities/Category.Entity';
import Post from '../entities/Post.Entity';
import User from '../entities/User.Entity';

export default class PostSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(Post);
    const userRepository = dataSource.getRepository(User);
    const categoryRepository = dataSource.getRepository(Category);

    const postOwner = await userRepository.findOneBy({
      email: 'admin@mail.com',
    });
    const postCat = await categoryRepository.findOneBy({
      title: 'Administração',
    });

    const ownerId = postOwner?.id.toString();
    const catId = postCat?.id.toString();

    const data = {
      title: 'Primeira publicação',
      description: 'Seja bem-vindo ao blog!',
      likes: 0,
      category: catId,
      owner: ownerId,
    };

    const newUser = repository.create(data);
    await repository.save(newUser);
  }
}
