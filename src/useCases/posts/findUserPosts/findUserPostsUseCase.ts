import { singleton } from 'tsyringe';
import { IPostRepository } from '../../../interfaces';
import { IUseCase } from '../../../interfaces/IUseCase';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export class FindUserPostsUseCase implements IUseCase {
  constructor(private postRepository: IPostRepository) {}

  public async execute(userId: string) {
    const data = await this.postRepository.findPostsByOwner(userId);

    if (!data) throw CustomError.notFound('Posts not found');

    return data;
  }
}
