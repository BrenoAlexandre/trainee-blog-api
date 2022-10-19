import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Path, Route, SuccessResponse } from 'tsoa';
import { FindCategoryPostsUseCase } from './findCategoryPostsUseCase';

@Route('posts')
export class FindCategoryPostsController {
  constructor(private findCategoryPostsUseCase: FindCategoryPostsUseCase) {}

  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Get('category/{categoryId}')
  public async handler(@Path() categoryId: string) {
    const post = await this.findCategoryPostsUseCase.execute(categoryId);
    return post;
  }
}
