import { singleton } from 'tsyringe';
import { CustomError } from '../../../utils/customError.util';
import { EErrorMessages, IFindParams, IUseCase } from '../../../interfaces';
import { PostRepository } from '../../../services/implementation/PostRepository';

@singleton()
export class FindPostsUseCase implements IUseCase {
  constructor(private postRepository: PostRepository) {}

  public async execute({ page, take }: { page: string; take: string }) {
    const pageNumber = parseInt(page, 10);
    const takeNumber = parseInt(take, 10);

    const findOptions: IFindParams = {
      pagination: { page: pageNumber, take: takeNumber },
      order: 'ASC',
    };

    const posts = await this.postRepository.findPosts(findOptions);

    if (!posts)
      throw CustomError.notFound(EErrorMessages.POST_NOT_FOUND, {
        message: 'Posts not found',
      });

    const [allPosts, postCount] = posts;

    if (allPosts.length === 0)
      throw CustomError.notFound(EErrorMessages.POST_NOT_FOUND, {
        message: 'Posts not found',
      });

    let previous;
    let next: number | null = pageNumber + 1;
    const total = Math.floor(postCount / takeNumber);

    if (pageNumber < 2) {
      previous = previous === 0 ? null : 0;
    } else {
      previous = pageNumber - 1;
    }

    next = next > total ? null : next;

    const response = {
      data: allPosts,
      previous,
      next,
      total,
    };

    return response;
  }
}
