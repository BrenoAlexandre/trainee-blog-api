import { singleton } from 'tsyringe';
import { EErrorMessages, IUseCase } from '../../../interfaces';
import { PostRepository } from '../../../services/implementation/PostRepository';
import { CustomError } from '../../../utils/customError.util';
import { IUpdateInput } from './interfaces';

@singleton()
export class UpdatePostUseCase implements IUseCase {
  constructor(private postRepository: PostRepository) {}

  public async execute(input: IUpdateInput): Promise<boolean> {
    const edited = await this.postRepository.updatePost(input);

    if (!edited) {
      throw CustomError.unprocessable(EErrorMessages.INVALID_OPERATION, {
        message: 'Unable to update post',
      });
    }
    return edited;
  }
}
