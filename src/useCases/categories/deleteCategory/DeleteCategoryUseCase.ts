import { singleton } from 'tsyringe';
import { EErrorMessages, IUseCase } from '../../../interfaces';
import { CategoryService } from '../../../services/implementation/CategoryService';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class DeleteCategoryUseCase implements IUseCase {
  constructor(private categoryRepository: CategoryService) {}

  private validate(userRole: string) {
    if (userRole !== 'admin') {
      throw CustomError.forbidden(EErrorMessages.FORBIDDEN_OPERATION, {
        message: `You don't  have the permission to create a category`,
      });
    }
  }

  public async execute(data: {
    categoryId: string;
    userRole: string;
  }): Promise<void> {
    const { categoryId, userRole } = data;

    this.validate(userRole);

    const category = await this.categoryRepository.deleteCategory(categoryId);

    if (!category)
      throw CustomError.notFound(EErrorMessages.CATEGORY_NOT_FOUND, {
        message: 'Category not found',
      });
  }
}
