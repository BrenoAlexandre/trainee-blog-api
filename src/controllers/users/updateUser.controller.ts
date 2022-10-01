import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { UpdateUserInput } from '../../schemas/user.schema';

import { updateUser } from '../../services/users/user.service';

export async function updateUserHandler(
  request: Request<{}, {}, UpdateUserInput['body']>,
  response: Response,
  next: NextFunction
) {
  try {
    const { user } = response.locals;
    const { body } = request;
    const { name } = body;

    await updateUser({ name, user });
    response.status(StatusCodes.CREATED).send();
  } catch (error) {
    logger.error(`updateUserHandler :>> ${error}`);
    next(error);
  }
}
