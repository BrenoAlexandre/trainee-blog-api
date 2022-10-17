import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Route, SuccessResponse } from 'tsoa';
import logger from '../../../config/logger';
import { IUseCase } from '../../../interfaces/IUseCase';

@Route('posts')
export class FindCategoryPostsController {
  constructor(private FindCategoryPostsUseCase: IUseCase) {}

  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Get('category/{categoryId}')
  public async handler(
    // @Path() categoryId: string
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { categoryId } = request.params;

      const post = await this.FindCategoryPostsUseCase.execute(categoryId);

      response.status(StatusCodes.OK).json(post);
    } catch (error) {
      logger.error(`findCategoryPostsController :>> ${error}`);
      next(error);
    }
  }
}
