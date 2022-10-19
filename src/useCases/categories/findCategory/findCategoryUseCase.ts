import { ICategoryRepository } from '../../../interfaces';
import { IUseCase } from '../../../interfaces/IUseCase';
import { CustomError } from '../../../utils/customError.util';

export class FindCategoryUseCase implements IUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  public async execute(categoryId: string) {
    const category = await this.categoryRepository.findCategoryById(categoryId);

    if (!category) throw CustomError.notFound('Category not found');
    return category;
  }
}
