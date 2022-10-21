import { ICategoryRepository, IUseCase } from '../../../interfaces';
import { CustomError } from '../../../utils/customError.util';
import { ICreateCategoryResponseDTO } from './createCategoryResponseDTO';
import { ICreateCategoryInput } from './interfaces';

export class CreateCategoryUseCase implements IUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  private validate(user: ICreateCategoryInput['user']) {
    if (user.role !== 'admin') {
      CustomError.authorization(
        'You dont have permission to create a category'
      );
    }
  }

  public async execute(
    input: ICreateCategoryInput
  ): Promise<ICreateCategoryResponseDTO> {
    const { title, user } = input;

    this.validate(user);

    const category = { title, owner: user.id.toString() };
    const newCategory = await this.categoryRepository.createCategory(category);

    return {
      id: newCategory.id,
      title: newCategory.title,
      ownerId: newCategory.owner,
      created_at: newCategory.created_at,
    };
  }
}
