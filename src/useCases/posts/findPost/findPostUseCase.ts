import { singleton } from 'tsyringe';
import { IPostRepository } from '../../../interfaces';
import { IUseCase } from '../../../interfaces/IUseCase';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class FindPostUseCase implements IUseCase {
  constructor(private postRepository: IPostRepository) {}

  public async execute(postId: string) {
    const post = await this.postRepository.findPostById(postId);

    if (!post) throw CustomError.notFound('Post not found');
    return post;
  }
}
