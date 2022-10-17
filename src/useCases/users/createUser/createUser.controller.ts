import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Body, Post, Route, SuccessResponse } from 'tsoa';
import logger from '../../../config/logger';
import { IController } from '../../../interfaces/IController';
import { IUseCase } from '../../../interfaces/IUseCase';
import { CreateUserInput } from '../../../schemas/user.schema';
import { ICreateUserInput } from './interface';

@Route('users')
export class CreateUserController implements IController {
  constructor(private createUserUseCase: IUseCase) {}

  @SuccessResponse(StatusCodes.CREATED, ReasonPhrases.CREATED)
  @Post()
  public async handler(
    @Body() request: Request<{}, {}, CreateUserInput['body']>,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { body } = request;
      const { name, email, password, passwordConfirmation, role } = body;

      const data: ICreateUserInput = {
        name,
        email,
        password,
        passwordConfirmation,
        role,
      };

      const user = await this.createUserUseCase.execute(data);
      response.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      logger.error(`createUserController :>> ${error}`);
      next(error);
    }
  }
}
