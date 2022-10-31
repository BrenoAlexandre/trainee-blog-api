import { singleton } from 'tsyringe';
import { EErrorMessages, IUseCase } from '../../../interfaces';
import { CategoryRepository } from '../../../services/implementation/CategoryRepository';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class FindCategoryUseCase implements IUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  public async execute(categoryId: string) {
    const category = await this.categoryRepository.findCategoryById(categoryId);

    if (!category)
      throw CustomError.notFound(EErrorMessages.CATEGORY_NOT_FOUND, {
        message: 'Category not found',
      });
    return category;
  }
}
