import CategoryRepository from '../../../database/repositories/category.repository';
import { CreateCategoryController } from './createCategory.controller';
import { CreateCategoryUseCase } from './createCategoryUseCase';

const categoryRepository = CategoryRepository;

const useCase = new CreateCategoryUseCase(categoryRepository);
const controller = new CreateCategoryController(useCase);

export default controller;
