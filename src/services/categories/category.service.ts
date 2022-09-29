import CategoryRepository from '../../database/repositories/CategoryRepository';
import UserRepository from '../../database/repositories/UserRepository';

interface ICreateCategoryInput {
  title: string;
  ownerId: string;
}

export async function createCategory(input: ICreateCategoryInput) {
  const categoryRepository = new CategoryRepository();
  const userRepository = new UserRepository();

  const owner = await userRepository.findUserById(input.ownerId);

  if (!owner) throw new Error('A category should be related to a user');

  const category = { ...input, owner };
  const newCategory = await categoryRepository.createCategory(category);
  return newCategory;
}
