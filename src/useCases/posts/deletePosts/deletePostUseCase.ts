import { singleton } from 'tsyringe';
import { EErrorMessages, IUseCase } from '../../../interfaces';
import { PostRepository } from '../../../services/implementation/PostRepository';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class DeletePostUseCase implements IUseCase {
  constructor(private postRepository: PostRepository) {}

  public async execute(input: {
    postId: string;
    userId: string;
  }): Promise<void> {
    const { postId, userId } = input;
    const deleted = await this.postRepository.deletePost(postId, userId);

    if (!deleted)
      throw CustomError.unprocessable(EErrorMessages.INVALID_OPERATION, {
        message: 'Unable to delete post',
      });
  }
}
