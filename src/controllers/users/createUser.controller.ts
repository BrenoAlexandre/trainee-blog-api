import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { CreateUserInput } from '../../schemas/user.schema';

import { createUser } from '../../services/users/user.service';

export async function createUserHandler(
  request: Request<{}, {}, CreateUserInput['body']>,
  response: Response,
  next: NextFunction
) {
  try {
    const { body } = request;
    const {
      name,
      email,
      password,
      passwordConfirmation = '',
      role = 'user',
    } = body;
    const data = { name, email, password, passwordConfirmation, role };

    const user = await createUser(data);
    response.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    logger.error(`createUserHandler :>> ${error}`);
    next(error);
  }
}
