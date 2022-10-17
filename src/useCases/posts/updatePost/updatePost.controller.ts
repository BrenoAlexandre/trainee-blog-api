import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Put, Route, SuccessResponse } from 'tsoa';
import logger from '../../../config/logger';
import { IUseCase } from '../../../interfaces/IUseCase';
import { IUpdateInput } from './interfaces';

@Route('posts')
export class UpdatePostController {
  constructor(private updatePostUseCase: IUseCase) {}

  @SuccessResponse(StatusCodes.CONTINUE, ReasonPhrases.CONTINUE)
  @Put('{postId}')
  public async handler(
    // @Path() postId: string
    @Body() request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { user } = response.locals;
      const { body, params } = request;
      const { title, description, category } = body;
      const { postId } = params;

      const data: IUpdateInput = {
        title,
        description,
        categoryId: category,
        postId,
        ownerId: user.id,
      };

      await this.updatePostUseCase.execute(data);
      response.status(StatusCodes.CONTINUE).json({});
    } catch (error) {
      logger.error(`patchPostController :>> ${error}`);
      next(error);
    }
  }
}
