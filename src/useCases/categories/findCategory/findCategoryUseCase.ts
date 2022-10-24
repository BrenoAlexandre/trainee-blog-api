import { singleton } from 'tsyringe';
import { IUseCase } from '../../../interfaces';
import { CategoryRepository } from '../../../services/implementation/CategoryRepository';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class FindCategoryUseCase implements IUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  public async execute(categoryId: string) {
    const category = await this.categoryRepository.findCategoryById(categoryId);

    if (!category) throw CustomError.notFound('Category not found');
    return category;
  }
}
