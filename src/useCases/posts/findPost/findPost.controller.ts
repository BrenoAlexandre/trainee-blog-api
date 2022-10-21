import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Path, Route, SuccessResponse, Tags } from 'tsoa';
import { UUID } from '../../../interfaces';
import { FindPostUseCase } from './findPostUseCase';

@Route('post')
export class FindPostController {
  constructor(private findPostUseCase: FindPostUseCase) {}

  @Tags('Posts')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Get('{postId}')
  public async handler(@Path() postId: UUID) {
    const posts = await this.findPostUseCase.execute(postId);
    return posts;
  }
}
