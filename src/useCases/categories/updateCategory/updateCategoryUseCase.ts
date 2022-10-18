import CategoryRepository from '../../../database/repositories/category.repository';
import User from '../../../database/entities/User.Entity';
import { CustomError } from '../../../utils/customError.util';
import { IUseCase } from '../../../interfaces/IUseCase';

export class UpdateCategoryUseCase implements IUseCase {
  constructor(private categoryRepository: typeof CategoryRepository) {}

  public async execute({
    categoryId,
    title,
    user,
  }: {
    categoryId: string;
    title: string;
    user: User;
  }): Promise<void> {
    const category = await this.categoryRepository.findCategoryById(categoryId);

    if (category?.posts.length)
      CustomError.badRequest(
        'You cant update a category with post associated to it'
      );

    if (user.role !== 'admin') {
      CustomError.authorization(
        'You dont have permission to update a category'
      );
    }
    const editedCategory = await this.categoryRepository.updateCategory(
      categoryId,
      title
    );

    if (!editedCategory) throw CustomError.notFound('Category not found');
  }
}
