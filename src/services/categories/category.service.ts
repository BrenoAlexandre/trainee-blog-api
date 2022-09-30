import categoryRepository from '../../database/repositories/category.repository';
import userRepository from '../../database/repositories/user.repository';

interface ICreateCategoryInput {
  title: string;
  ownerId: string;
}

export async function createCategory(input: ICreateCategoryInput) {
  const owner = await userRepository.findUserById(input.ownerId);

  if (!owner) throw new Error('A category should be related to a user');

  const category = { ...input, owner };
  const newCategory = await categoryRepository.createCategory(category);
  return newCategory;
}

export async function findCategories() {
  const categories = await categoryRepository.findCategories();
  return categories;
}
