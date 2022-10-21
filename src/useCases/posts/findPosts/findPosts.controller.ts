import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Path, Route, SuccessResponse, Tags } from 'tsoa';
import { FindPostsUseCase } from './findPostsUseCase';
import { IPaginationResponse } from './interfaces';

@Route('post')
export class FindPostsController {
  constructor(private findPostsUseCase: FindPostsUseCase) {}

  @Tags('Posts')
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
