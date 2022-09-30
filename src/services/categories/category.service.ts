import categoryRepository from '../../database/repositories/category.repository';

interface ICreateCategoryInput {
  title: string;
  ownerId: string;
}

export async function createCategory(input: ICreateCategoryInput) {
  const category = { title: input.title, owner: input.ownerId };
  const newCategory = await categoryRepository.createCategory(category);
  return newCategory;
}

export async function findCategories() {
  const categories = await categoryRepository.findCategories();
  return categories;
}
