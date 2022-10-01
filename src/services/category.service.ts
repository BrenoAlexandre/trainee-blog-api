import User from '../database/entities/User.Entity';
import categoryRepository from '../database/repositories/category.repository';
import { CustomError } from '../utils/customError.util';

interface ICreateCategoryInput {
  title: string;
  user: User;
}

export async function createCategory(input: ICreateCategoryInput) {
  const { user } = input;

  if (user.role !== 'admin') {
    CustomError.authorization('You dont have permission to create a category');
  }

  const category = { title: input.title, owner: user.id.toString() };
  const newCategory = await categoryRepository.createCategory(category);
  return newCategory;
}

export async function findCategories() {
  const categories = await categoryRepository.findCategories();

  if (!categories) throw CustomError.notFound('Categories not found');
  return categories;
}

export async function findCategory(categoryId: string) {
  const category = await categoryRepository.findCategoryById(categoryId);

  if (!category) throw CustomError.notFound('Category not found');
  return category;
}

export async function updateCategory(
  categoryId: string,
  title: string,
  user: User
): Promise<void> {
  const category = await categoryRepository.findCategoryById(categoryId);

  if (category?.posts.length)
    CustomError.badRequest(
      'You cant update a category with post associated to it'
    );

  if (user.role !== 'admin') {
    CustomError.authorization('You dont have permission to update a category');
  }
  const editedCategory = await categoryRepository.updateCategory(
    categoryId,
    title
  );

  if (!editedCategory) throw CustomError.notFound('Category not found');
}

export async function deleteCategory(
  categoryId: string,
  user: User
): Promise<void> {
  if (user.role !== 'admin') {
    CustomError.authorization('You dont have permission to delete a category');
  }

  const category = await categoryRepository.deleteCategory(categoryId);

  if (!category) throw CustomError.notFound('Category not found');
}
