import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Route, SuccessResponse } from 'tsoa';
import logger from '../../../config/logger';
import { IController } from '../../../interfaces/IController';
import { IUseCase } from '../../../interfaces/IUseCase';

@Route('posts')
export class FindPostController implements IController {
  constructor(private findPostsUseCase: IUseCase) {}

  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Get('{postId}')
  public async handler(
    // @Path() postId: string
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { postId } = request.params;

      const posts = await this.findPostsUseCase.execute(postId);
      response.status(StatusCodes.OK).json(posts);
    } catch (error) {
      logger.error(`findPostController :>> ${error}`);
      next(error);
    }
  }
}
