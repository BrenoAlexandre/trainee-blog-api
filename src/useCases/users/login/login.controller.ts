import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Post, Body, SuccessResponse } from 'tsoa';
import logger from '../../../config/logger';
import { ValidateLoginInput } from '../../../schemas/user.schema';
import { IController } from '../../../interfaces/IController';

import { LoginUseCase } from './loginUseCase';
import { ILoginInput } from './interfaces';

export class LoginController implements IController {
  constructor(private loginUseCase: LoginUseCase) {}

  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
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
        .status(StatusCodes.OK)
        .setHeader('authorization', token)
        .setHeader('refreshToken', refreshToken)
        .send();
    } catch (error) {
      logger.error(`validateLoginController :>> ${error}`);
      next(error);
    }
  }
}
