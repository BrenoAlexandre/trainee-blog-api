import { singleton } from 'tsyringe';
import { IUseCase } from '../../../interfaces';
import { CategoryRepository } from '../../../services/implementation/CategoryRepository';
import { CustomError } from '../../../utils/customError.util';
import { IUser } from '../../../models/user.model';

@singleton()
export class UpdateCategoryUseCase implements IUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

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
