import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Delete, Route, SuccessResponse } from 'tsoa';
import logger from '../../../config/logger';
import { IUseCase } from '../../../interfaces/IUseCase';

import { IDeleteInput } from './interfaces';

@Route('posts')
export class DeletePostController {
  constructor(private deletePostUseCase: IUseCase) {}

  @SuccessResponse(StatusCodes.CONTINUE, ReasonPhrases.CONTINUE)
  @Delete('{postId}')
  public async handler(
    // @Path('{postId}')
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { user } = response.locals;
      const { params } = request;
      const { postId } = params;

      const data: IDeleteInput = { postId, userId: user.id };

      await this.deletePostUseCase.execute(data);
      response.status(StatusCodes.CONTINUE).send();
    } catch (error) {
      logger.error(`deletePostController :>> ${error}`);
      next(error);
    }
  }
}
