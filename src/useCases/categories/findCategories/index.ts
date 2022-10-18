import CategoryRepository from '../../../database/repositories/category.repository';
import { FindCategoriesController } from './findCategories.controller';
import { FindCategoriesUseCase } from './findCategoriesUseCase';

const categoryRepository = CategoryRepository;

const useCase = new FindCategoriesUseCase(categoryRepository);
const controller = new FindCategoriesController(useCase);

export default controller;
