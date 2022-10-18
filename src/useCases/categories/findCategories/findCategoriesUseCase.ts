import CategoryRepository from '../../../database/repositories/category.repository';
import { IUseCase } from '../../../interfaces/IUseCase';
import { CustomError } from '../../../utils/customError.util';

export class FindCategoriesUseCase implements IUseCase {
  constructor(private categoryRepository: typeof CategoryRepository) {}

  public async execute() {
    const categories = await this.categoryRepository.findCategories();

    if (!categories) throw CustomError.notFound('Categories not found');
    return categories;
  }
}
