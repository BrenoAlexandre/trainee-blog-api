import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Get, Route, SuccessResponse } from 'tsoa';
import logger from '../../../config/logger';
import { IController } from '../../../interfaces/IController';
import { IUseCase } from '../../../interfaces/IUseCase';

@Route('categories')
export class FindCategoryController implements IController {
  constructor(private findCategoryUseCase: IUseCase) {}

  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Get('{categoryId}')
  public async handler(
    // @Path() categoryId: UUID
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { categoryId } = request.params;

      const category = await this.findCategoryUseCase.execute(categoryId);
      response.status(StatusCodes.OK).json(category);
    } catch (error) {
      logger.error(`findCategoryController :>> ${error}`);
      next(error);
    }
  }
}
