import { singleton } from 'tsyringe';
import { EErrorMessages, IUseCase } from '../../../interfaces';
import { PostRepository } from '../../../services/implementation/PostRepository';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class FindPostUseCase implements IUseCase {
  constructor(private postRepository: PostRepository) {}

  public async execute(postId: string) {
    const post = await this.postRepository.findPostById(postId);

    if (!post)
      throw CustomError.notFound(EErrorMessages.POST_NOT_FOUND, {
        message: 'Posts not found',
      });
    return post;
  }
}
