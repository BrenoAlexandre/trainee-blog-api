import PostRepository from '../../../database/repositories/post.repository';
import { IUseCase } from '../../../interfaces/IUseCase';
import { CustomError } from '../../../utils/customError.util';

export class FindUserPostsUseCase implements IUseCase {
  constructor(private postRepository: typeof PostRepository) {}

  public async execute(userId: string) {
    const data = await this.postRepository.findPostsByOwner(userId);

    if (!data) throw CustomError.notFound('Posts not found');

    return data;
  }
}
