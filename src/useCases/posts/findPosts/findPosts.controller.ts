import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Get, Route, SuccessResponse } from 'tsoa';
import logger from '../../../config/logger';
import { IController } from '../../../interfaces/IController';
import { IUseCase } from '../../../interfaces/IUseCase';
import { IPaginationResponse } from './interfaces';

@Route('posts')
export class FindPostsController implements IController {
  constructor(private findPostsUseCase: IUseCase) {}

  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Get('page={page}&take={take}')
  public async handler(
    // @Path() page: string
    // @Path() take: string
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { page, take } = request.params;

      const data: IPaginationResponse = await this.findPostsUseCase.execute({
        page,
        take,
      });

      response.status(StatusCodes.OK).json(data);
    } catch (error) {
      logger.error(`findPostsController :>> ${error}`);
      next(error);
    }
  }
}
