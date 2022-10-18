import CategoryRepository from '../../../database/repositories/category.repository';
import { IUseCase } from '../../../interfaces/IUseCase';
import { CustomError } from '../../../utils/customError.util';
import { ICreateCategoryInput } from './inerfaces';

export class CreateCategoryUseCase implements IUseCase {
  constructor(private categoryRepository: typeof CategoryRepository) {}

  private validate(user: ICreateCategoryInput['user']) {
    if (user.role !== 'admin') {
      CustomError.authorization(
        'You dont have permission to create a category'
      );
    }
  }

  public async execute(input: ICreateCategoryInput) {
    const { user } = input;

    this.validate(user);

    const category = { title: input.title, owner: user.id.toString() };
    const newCategory = await this.categoryRepository.createCategory(category);
    return newCategory;
  }
}
