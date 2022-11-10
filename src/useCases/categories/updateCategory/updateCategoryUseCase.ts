import { singleton } from 'tsyringe';
import { EErrorMessages, IUseCase } from '../../../interfaces';
import { CategoryService } from '../../../services/implementation/CategoryService';
import { CustomError } from '../../../utils/customError.util';
import { IUser } from '../../../models/user.model';

@singleton()
export class UpdateCategoryUseCase implements IUseCase {
  constructor(private categoryRepository: CategoryService) {}

  public async execute({
    categoryId,
    title,
    user,
  }: {
    categoryId: string;
    title: string;
    user: IUser;
  }): Promise<void> {
    const category = await this.categoryRepository.findCategoryById(categoryId);

    if (category?.posts.length)
      CustomError.unprocessable(EErrorMessages.INVALID_OPERATION, {
        message: `You  can't update a category with post associated to it`,
      });

    if (user.role !== 'admin') {
      CustomError.authorization(EErrorMessages.FORBIDDEN_OPERATION, {
        message: `You  don't have permission to update a category`,
      });
    }
    const editedCategory = await this.categoryRepository.updateCategory(
      categoryId,
      title
    );

    if (!editedCategory)
      throw CustomError.notFound(EErrorMessages.CATEGORY_NOT_FOUND, {
        message: 'Category not found',
      });
  }
}
