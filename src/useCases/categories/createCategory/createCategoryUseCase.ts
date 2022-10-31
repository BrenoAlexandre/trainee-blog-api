import { pick } from 'lodash';
import { singleton } from 'tsyringe';
import { EErrorMessages, IUseCase } from '../../../interfaces';
import { CategoryRepository } from '../../../services/implementation/CategoryRepository';
import { CustomError } from '../../../utils/customError.util';
import { ICreateCategoryResponseDTO } from './createCategoryResponseDTO';
import { ICreateCategoryInput } from './interfaces';

@singleton()
export class CreateCategoryUseCase implements IUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  private validate(user: ICreateCategoryInput['user']) {
    if (user.role !== 'admin') {
      CustomError.forbidden(EErrorMessages.FORBIDDEN_OPERATION, {
        message: `You don't  have permission to create a category`,
      });
    }
  }

  public async execute(
    input: ICreateCategoryInput
  ): Promise<ICreateCategoryResponseDTO> {
    const { title, user } = input;

    this.validate(user);

    const category = { title, owner: user.id.toString() };
    const newCategory = await this.categoryRepository.createCategory(category);

    return pick(newCategory, ['id', 'title', 'owner', 'created_at']);
  }
}
