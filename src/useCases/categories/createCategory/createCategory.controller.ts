import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Body, Post, Route, SuccessResponse } from 'tsoa';
import logger from '../../../config/logger';
import { IController } from '../../../interfaces/IController';
import { IUseCase } from '../../../interfaces/IUseCase';
import { CreateCategoryInput } from '../../../schemas/category.schema';
import { ICreateCategoryInput } from './inerfaces';

@Route('categories')
export class CreateCategoryController implements IController {
  constructor(private createCategoryUseCase: IUseCase) {}

  @SuccessResponse(StatusCodes.CREATED, ReasonPhrases.CREATED)
  @Post()
  public async handler(
    @Body() request: Request<{}, {}, CreateCategoryInput['body']>,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { user } = response.locals;
      const { body } = request;
      const { title } = body;

      const data: ICreateCategoryInput = { title, user };

      const product = await this.createCategoryUseCase.execute(data);

      response.status(StatusCodes.CREATED).json(product);
    } catch (error) {
      logger.error(`createCategoryController :>> ${error}`);
      next(error);
    }
  }
}
