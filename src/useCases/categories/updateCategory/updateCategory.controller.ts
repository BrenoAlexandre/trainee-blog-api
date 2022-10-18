import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Put, Route, SuccessResponse } from 'tsoa';
import logger from '../../../config/logger';
import { IUseCase } from '../../../interfaces/IUseCase';

@Route('categories')
export class UpdateCategoryController {
  constructor(private updateCategoryUseHandler: IUseCase) {}

  @SuccessResponse(StatusCodes.CONTINUE, ReasonPhrases.CONTINUE)
  @Put('{categoryId}')
  public async handler(
    // Path() categoryId: UUID
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { user } = response.locals;
      const { categoryId } = request.params;
      const { title } = request.body;

      await this.updateCategoryUseHandler.execute({ categoryId, title, user });
      response.status(StatusCodes.CONTINUE).send();
    } catch (error) {
      logger.error(`updateCategoryController :>> ${error}`);
      next(error);
    }
  }
}
