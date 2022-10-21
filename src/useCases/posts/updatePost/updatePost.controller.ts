import * as Express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Path, Put, Request, Route, SuccessResponse, Tags } from 'tsoa';
import { UUID } from '../../../interfaces';
import { IUpdateInput } from './interfaces';
import { UpdatePostUseCase } from './updatePostUseCase';

@Route('post')
export class UpdatePostController {
  constructor(private updatePostUseCase: UpdatePostUseCase) {}

  @Tags('Posts')
  @SuccessResponse(StatusCodes.CONTINUE, ReasonPhrases.CONTINUE)
  @Put('{postId}')
  public async handler(
    @Path() postId: UUID,
    @Request() request: Express.Request
  ) {
    const { user, title, description, category } = request.body;

    const data: IUpdateInput = {
      title,
      description,
      categoryId: category,
      postId,
      ownerId: user.id,
    };

    await this.updatePostUseCase.execute(data);
  }
}
