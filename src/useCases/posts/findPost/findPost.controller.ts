import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Path, Route, SuccessResponse } from 'tsoa';
import { UUID } from '../../../interfaces';
import { FindPostUseCase } from './findPostUseCase';

@Route('posts')
export class FindPostController {
  constructor(private findPostUseCase: FindPostUseCase) {}

  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Get('{postId}')
  public async handler(@Path() postId: UUID) {
    const posts = await this.findPostUseCase.execute(postId);
    return posts;
  }
}
