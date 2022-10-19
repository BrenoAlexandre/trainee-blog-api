import { IPostRepository } from '../../../interfaces';
import { IUseCase } from '../../../interfaces/IUseCase';
import { CustomError } from '../../../utils/customError.util';
import { IUpdateInput } from './interfaces';

export class UpdatePostUseCase implements IUseCase {
  constructor(private postRepository: IPostRepository) {}

  public async execute(input: IUpdateInput): Promise<boolean> {
    const edited = await this.postRepository.updatePost(input);

    if (!edited) {
      throw CustomError.unprocess('Unable to update post');
    }
    return edited;
  }
}
