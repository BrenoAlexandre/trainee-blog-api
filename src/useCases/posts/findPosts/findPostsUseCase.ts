import { CustomError } from '../../../utils/customError.util';
import { IUseCase } from '../../../interfaces/IUseCase';
import { IFindParams } from '../../../interfaces/IFindParams';
import { IPostRepository } from '../../../interfaces';

export class FindPostsUseCase implements IUseCase {
  constructor(private postRepository: IPostRepository) {}

  public async execute({ page, take }: { page: string; take: string }) {
    const pageNumber = parseInt(page, 10);
    const takeNumber = parseInt(take, 10);

    const findOptions: IFindParams = {
      pagination: { page: pageNumber, take: takeNumber },
      order: 'ASC',
    };

    const posts = await this.postRepository.findPosts(findOptions);

    if (posts.length === 0) throw CustomError.notFound('Posts not found');

    const previous = pageNumber < 2 ? 0 : pageNumber - 1;
    const nextPage = pageNumber + 1;

    const response = {
      data: [...posts],
      previous,
      next: nextPage,
    };

    return response;
  }
}
