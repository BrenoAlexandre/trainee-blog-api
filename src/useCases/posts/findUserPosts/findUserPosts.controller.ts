import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Route, SuccessResponse } from 'tsoa';
import logger from '../../../config/logger';
import { IController } from '../../../interfaces/IController';
import { IUseCase } from '../../../interfaces/IUseCase';

@Route('posts')
export class FindUserPostsController implements IController {
  constructor(private findUserPostsUseCase: IUseCase) {}

  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Get('user/{userId}')
  public async handler(
    // @Path() userId: string
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = request.params;

      const post = await this.findUserPostsUseCase.execute(userId);
      response.status(StatusCodes.OK).json(post);
    } catch (error) {
      logger.error(`findUserPostsController :>> ${error}`);
      next(error);
    }
  }
}
