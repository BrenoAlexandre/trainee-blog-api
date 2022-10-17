import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Body, Post, SuccessResponse } from 'tsoa';
import logger from '../../../config/logger';
import { IController } from '../../../interfaces/IController';
import { IUseCase } from '../../../interfaces/IUseCase';
import { UpdateUserInput } from '../../../schemas/user.schema';
import { IUpdateInput } from './interfaces';

export class UpdateUserController implements IController {
  constructor(private updateUserUseCase: IUseCase) {}

  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Post()
  public async handler(
    @Body() request: Request<{}, {}, UpdateUserInput['body']>,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { user } = response.locals;
      const { body } = request;
      const { name } = body;

      const data: IUpdateInput = { name, user };

      await this.updateUserUseCase.execute(data);

      response.status(StatusCodes.OK).send();
    } catch (error) {
      logger.error(`updateUserController :>> ${error}`);
      next(error);
    }
  }
}
