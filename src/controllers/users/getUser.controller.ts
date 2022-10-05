import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { ReadUserInput } from '../../schemas/user.schema';

import { findUser } from '../../services/user.service';

export async function findUserHandler(
  request: Request<ReadUserInput['params'], {}, {}>,
  response: Response,
  next: NextFunction
) {
  try {
    const { userId } = request.params;

    const user = await findUser(userId);
    response.status(StatusCodes.OK).json({ user });
  } catch (error) {
    logger.error(`findUserHandler :>> ${error}`);
    next(error);
  }
}
