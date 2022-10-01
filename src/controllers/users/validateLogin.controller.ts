import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { ValidateLoginInput } from '../../schemas/user.schema';

import { validateLogin } from '../../services/user.service';

export async function validateLoginHandler(
  request: Request<{}, {}, ValidateLoginInput['body']>,
  response: Response,
  next: NextFunction
) {
  try {
    const { body } = request;
    const { email, password } = body;
    const data = { email, password };
    const tokens = await validateLogin(data);
    response
      .status(StatusCodes.OK)
      .set({ authorization: tokens.token, refreshToken: tokens.refreshToken })
      .send();
  } catch (error) {
    logger.error(`validateLoginHandler :>> ${error}`);
    next(error);
  }
}
