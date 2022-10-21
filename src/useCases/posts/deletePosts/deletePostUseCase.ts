import { IPostRepository, IUseCase } from '../../../interfaces';
import { CustomError } from '../../../utils/customError.util';

export class DeletePostUseCase implements IUseCase {
  constructor(private postRepository: IPostRepository) {}

  public async execute(input: {
    postId: string;
    userId: string;
  }): Promise<void> {
    const { postId, userId } = input;
    const deleted = await this.postRepository.deletePost(postId, userId);

    if (!deleted) throw CustomError.unprocess('Unable to delete post');
  }
}
