import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Path, Route, SuccessResponse, Tags } from 'tsoa';
import { UUID } from '../../../interfaces';
import { FindUserPostsUseCase } from './findUserPostsUseCase';

@Route('post')
export class FindUserPostsController {
  constructor(private findUserPostsUseCase: FindUserPostsUseCase) {}

  @Tags('Posts')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Get('user/{userId}')
  public async handler(@Path() userId: UUID) {
    const post = await this.findUserPostsUseCase.execute(userId);
    return post;
  }
}
