import * as Express from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Delete, Path, Request, Route, SuccessResponse } from 'tsoa';
import { UUID } from '../../../interfaces';
import { DeletePostUseCase } from './deletePostUseCase';

import { IDeleteInput } from './interfaces';

@Route('posts')
export class DeletePostController {
  constructor(private deletePostUseCase: DeletePostUseCase) {}

  @SuccessResponse(StatusCodes.CONTINUE, ReasonPhrases.CONTINUE)
  @Delete('{postId}')
  public async handler(
    @Path() postId: UUID,
    @Request() request: Express.Request
  ) {
    const { user } = request.body;
    const data: IDeleteInput = { postId, userId: user.id };
    await this.deletePostUseCase.execute(data);
  }
}
