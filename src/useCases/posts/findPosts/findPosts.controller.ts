import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Path, Route, SuccessResponse } from 'tsoa';
import { FindPostsUseCase } from './findPostsUseCase';
import { IPaginationResponse } from './interfaces';

@Route('posts')
export class FindPostsController {
  constructor(private findPostsUseCase: FindPostsUseCase) {}

  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Get('page={page}&take={take}')
  public async handler(@Path() page: string, @Path() take: string) {
    const data: IPaginationResponse = await this.findPostsUseCase.execute({
      page,
      take,
    });
    return data;
  }
}
