import PostRepository from '../../../database/repositories/post.repository';
import { IUseCase } from '../../../interfaces/IUseCase';
import { CustomError } from '../../../utils/customError.util';

export class FindPostUseCase implements IUseCase {
  constructor(private postRepository: typeof PostRepository) {}

  public async execute(postId: string) {
    const post = await this.postRepository.findPostById(postId);

    if (!post) throw CustomError.notFound('Post not found');
    return post;
  }
}
