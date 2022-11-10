import { singleton } from 'tsyringe';
import { EErrorMessages, IUseCase } from '../../../interfaces';
import { PostService } from '../../../services/implementation/PostService';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class FindCategoryPostsUseCase implements IUseCase {
  constructor(private postRepository: PostService) {}

  public async execute(categoryId: string) {
    const data = await this.postRepository.findPostsByCategory(categoryId);

    if (!data)
      throw CustomError.notFound(EErrorMessages.POST_NOT_FOUND, {
        message: 'Posts not found',
      });

    return data;
  }
}
