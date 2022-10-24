import { singleton } from 'tsyringe';
import { IUseCase } from '../../../interfaces';
import { PostRepository } from '../../../services/implementation/PostRepository';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class FindCategoryPostsUseCase implements IUseCase {
  constructor(private postRepository: PostRepository) {}

  public async execute(categoryId: string) {
    const data = await this.postRepository.findPostsByCategory(categoryId);

    if (!data) throw CustomError.notFound('Posts not found');

    return data;
  }
}
