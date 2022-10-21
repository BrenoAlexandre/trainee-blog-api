import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Path, Route, SuccessResponse, Tags } from 'tsoa';
import { FindCategoryPostsUseCase } from './findCategoryPostsUseCase';

@Route('post')
export class FindCategoryPostsController {
  constructor(private findCategoryPostsUseCase: FindCategoryPostsUseCase) {}

  @Tags('Posts')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Get('category/{categoryId}')
  public async handler(@Path() categoryId: string) {
    const post = await this.findCategoryPostsUseCase.execute(categoryId);
    return post;
  }
}
