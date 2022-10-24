import { singleton } from 'tsyringe';
import { ICategoryRepository, IUseCase } from '../../../interfaces';
import { IUser } from '../../../models/user.model';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class DeleteCategoryUseCase implements IUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  public async execute({
    categoryId,
    user,
  }: {
    categoryId: string;
    user: IUser;
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
