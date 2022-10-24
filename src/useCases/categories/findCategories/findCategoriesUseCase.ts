import { singleton } from 'tsyringe';
import { IUseCase } from '../../../interfaces';
import { CategoryRepository } from '../../../services/implementation/CategoryRepository';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class FindCategoriesUseCase implements IUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  public async execute() {
    const categories = await this.categoryRepository.findCategories();

    if (!categories) throw CustomError.notFound('Categories not found');
    return categories;
  }
}
