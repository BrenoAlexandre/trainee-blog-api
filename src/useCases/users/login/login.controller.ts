import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Post, Body, Route, SuccessResponse } from 'tsoa';
import logger from '../../../config/logger';
import { ValidateLoginInput } from '../../../schemas/user.schema';
import { IController } from '../../../interfaces/IController';

import { ILoginInput } from './interfaces';
import { IUseCase } from '../../../interfaces/IUseCase';

@Route('users')
export class LoginController implements IController {
  constructor(private loginUseCase: IUseCase) {}

  @SuccessResponse(StatusCodes.CONTINUE, ReasonPhrases.CONTINUE)
  @Post('/login')
  public async handler(
    @Body() request: Request<{}, {}, ValidateLoginInput['body']>,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { body } = request;
      const { email, password } = body;

      const data: ILoginInput = { email, password };

      const { token, refreshToken } = await this.loginUseCase.execute(data);
      response
        .status(StatusCodes.CONTINUE)
        .setHeader('authorization', token)
        .setHeader('refreshToken', refreshToken)
        .send();
    } catch (error) {
      logger.error(`validateLoginController :>> ${error}`);
      next(error);
    }
  }
}
