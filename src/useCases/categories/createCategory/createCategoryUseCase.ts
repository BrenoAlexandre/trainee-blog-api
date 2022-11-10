import { singleton } from 'tsyringe';
import { EErrorMessages, IUseCase } from '../../../interfaces';
import { ICreateCategory } from '../../../models/category.model';
import { CategoryService } from '../../../services/implementation/CategoryService';
import { CustomError } from '../../../utils/customError.util';
import { ICreateCategoryResponseDTO } from './createCategoryResponseDTO';

@singleton()
export class CreateCategoryUseCase implements IUseCase {
  constructor(private categoryService: CategoryService) {}

  private validate(userRole: string) {
    if (userRole !== 'admin') {
      throw CustomError.forbidden(EErrorMessages.FORBIDDEN_OPERATION, {
        message: `You don't  have the permission to create a category`,
      });
    }
  }

  public async execute(data: {
    input: ICreateCategory;
    userRole: string;
  }): Promise<ICreateCategoryResponseDTO> {
    const { input, userRole } = data;
    const { title, owner } = input;

    this.validate(userRole);

    const category = { title, owner };
    const newCategory = await this.categoryService.createCategory(category);

    const response = {
      id: newCategory.id,
      title: newCategory.title,
      owner: newCategory.owner,
      created_at: newCategory.created_at,
    };

    return response;
  }
}
