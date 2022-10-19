import User from '../../../database/entities/User.Entity';
import { ICategoryRepository } from '../../../interfaces';
import { IUseCase } from '../../../interfaces/IUseCase';
import { CustomError } from '../../../utils/customError.util';

export class DeleteCategoryUseCase implements IUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  public async execute({
    categoryId,
    user,
  }: {
    categoryId: string;
    user: User;
  }): Promise<void> {
    if (user.role !== 'admin') {
      CustomError.authorization(
        'You dont have permission to delete a category'
      );
    }

    const category = await this.categoryRepository.deleteCategory(categoryId);

    if (!category) throw CustomError.notFound('Category not found');
  }
}
