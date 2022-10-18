import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Get, Route, SuccessResponse } from 'tsoa';
import logger from '../../../config/logger';
import { IUseCase } from '../../../interfaces/IUseCase';

@Route('categories')
export class FindCategoriesController {
  constructor(private findCategoriesUseCase: IUseCase) {}

  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Get()
  public async handler(
    request: Request<{}, {}, {}>,
    response: Response,
    next: NextFunction
  ) {
    try {
      const categories = await this.findCategoriesUseCase.execute({});
      response.status(StatusCodes.OK).json(categories);
    } catch (error) {
      logger.error(`findCategoriesController :>> ${error}`);
      next(error);
    }
  }
}
