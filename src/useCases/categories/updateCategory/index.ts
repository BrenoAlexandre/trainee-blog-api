import CategoryRepository from '../../../database/repositories/category.repository';
import { UpdateCategoryController } from './updateCategory.controller';
import { UpdateCategoryUseCase } from './updateCategoryUseCase';

const categoryRepository = CategoryRepository;

const useCase = new UpdateCategoryUseCase(categoryRepository);
const controller = new UpdateCategoryController(useCase);

export default controller;
