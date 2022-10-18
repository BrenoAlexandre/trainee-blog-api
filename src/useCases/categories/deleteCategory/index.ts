import CategoryRepository from '../../../database/repositories/category.repository';
import { DeleteCategoryController } from './deleteCategory.controller';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

const categoryRepository = CategoryRepository;

const useCase = new DeleteCategoryUseCase(categoryRepository);
const controller = new DeleteCategoryController(useCase);

export default controller;
