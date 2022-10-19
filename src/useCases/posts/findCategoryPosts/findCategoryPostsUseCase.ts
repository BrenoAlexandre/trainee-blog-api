import { IPostRepository } from '../../../interfaces';
import { IUseCase } from '../../../interfaces/IUseCase';
import { CustomError } from '../../../utils/customError.util';

export class FindCategoryPostsUseCase implements IUseCase {
  constructor(private postRepository: IPostRepository) {}

  public async execute(categoryId: string) {
    const data = await this.postRepository.findPostsByCategory(categoryId);

    if (!data) throw CustomError.notFound('Posts not found');

    return data;
  }
}
