import { singleton } from 'tsyringe';
import { EErrorMessages, IUseCase } from '../../../interfaces';
import { IUser } from '../../../models/user.model';
import { CategoryRepository } from '../../../services/implementation/CategoryRepository';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class DeleteCategoryUseCase implements IUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  public async execute({
    categoryId,
    user,
  }: {
    categoryId: string;
    user: IUser;
  }): Promise<void> {
    if (user.role !== 'admin') {
      CustomError.forbidden(EErrorMessages.FORBIDDEN_OPERATION, {
        message: `You don't  have permission to delete a category`,
      });
    }

    const category = await this.categoryRepository.deleteCategory(categoryId);

    if (!category)
      throw CustomError.notFound(EErrorMessages.CATEGORY_NOT_FOUND, {
        message: 'Category not found',
      });
  }
}
