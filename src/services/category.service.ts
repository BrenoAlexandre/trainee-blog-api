import { getRepository } from 'typeorm';
import categoryEntity from '../database/entities/Category.Entity';
import userEntity from '../database/entities/User.Entity';

interface ICreateCategory {
  title: string;
  owner: string;
}

export async function createCategory(input: ICreateCategory) {
  const categoryRepository = getRepository(categoryEntity);
  const userRepository = getRepository(userEntity);

  const owner = await userRepository.findOne(input.owner);

  const category = { ...input, owner };

  const newCategory = categoryRepository.create(category);

  await categoryRepository.save(newCategory);
  return newCategory;
}
