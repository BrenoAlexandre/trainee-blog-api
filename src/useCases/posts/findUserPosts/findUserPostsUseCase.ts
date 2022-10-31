import { singleton } from 'tsyringe';
import { EErrorMessages, IUseCase } from '../../../interfaces';
import { PostRepository } from '../../../services/implementation/PostRepository';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class FindUserPostsUseCase implements IUseCase {
  constructor(private postRepository: PostRepository) {}

  public async execute(userId: string) {
    const data = await this.postRepository.findPostsByOwner(userId);

    if (!data)
      throw CustomError.notFound(EErrorMessages.POST_NOT_FOUND, {
        message: 'Posts not found',
      });

    return data;
  }
}
