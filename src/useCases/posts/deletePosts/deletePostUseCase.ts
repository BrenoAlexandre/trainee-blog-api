import PostRepository from '../../../database/repositories/post.repository';
import { IUseCase } from '../../../interfaces/IUseCase';
import { CustomError } from '../../../utils/customError.util';
import { IDeleteInput } from './interfaces';

export class DeletePostUseCase implements IUseCase {
  constructor(private postRepository: typeof PostRepository) {}

  public async execute(input: IDeleteInput): Promise<void> {
    const { postId, userId } = input;
    const deleted = await this.postRepository.deletePost(postId, userId);

    if (!deleted) throw CustomError.unprocess('Unable to delete post');
  }
}
