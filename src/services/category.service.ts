import { getRepository } from 'typeorm';
import categoryEntity from '../database/entities/Category.Entity';
import { CategoryInput } from '../models/category.model';

export async function createCategory(input: CategoryInput) {
  const repository = getRepository(categoryEntity);
  const newCategory = repository.create(input);
  await repository.save(newCategory);
  return newCategory;
}
