import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Delete, Route, SuccessResponse } from 'tsoa';
import logger from '../../../config/logger';
import { IController } from '../../../interfaces/IController';
import { IUseCase } from '../../../interfaces/IUseCase';

@Route('categories')
export class DeleteCategoryController implements IController {
  constructor(private deleteCategoryUseCase: IUseCase) {}

  @SuccessResponse(StatusCodes.CONTINUE, ReasonPhrases.CONTINUE)
  @Delete('{categoryId}')
  public async handler(
    // @Path() categoryId: UUID
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { user } = response.locals;
      const { categoryId } = request.params;

      await this.deleteCategoryUseCase.execute({ categoryId, user });
      response.status(StatusCodes.CONTINUE).send();
    } catch (error) {
      logger.error(`deleteCategoryController :>> ${error}`);
      next(error);
    }
  }
}
