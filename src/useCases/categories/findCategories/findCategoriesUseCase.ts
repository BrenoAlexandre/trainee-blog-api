import { singleton } from 'tsyringe';
import { ICategoryRepository } from '../../../interfaces';
import { IUseCase } from '../../../interfaces/IUseCase';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class FindCategoriesUseCase implements IUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  public async execute() {
    const categories = await this.categoryRepository.findCategories();

    if (!categories) throw CustomError.notFound('Categories not found');
    return categories;
  }
}
