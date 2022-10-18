import CategoryRepository from '../../../database/repositories/category.repository';
import { FindCategoryController } from './findCategory.controller';
import { FindCategoryUseCase } from './findCategoryUseCase';

const categoryRepository = CategoryRepository;

const useCase = new FindCategoryUseCase(categoryRepository);
const controller = new FindCategoryController(useCase);

export default controller;
