import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { ReadUserPostsInput } from '../../schemas/post.schema';

import { findUserPosts } from '../../services/post.service';

export async function findUserPostsHandler(
  request: Request<ReadUserPostsInput['params'], {}, {}>,
  response: Response,
  next: NextFunction
) {
  try {
    const { userId } = request.params;

    const post = await findUserPosts(userId);
    response.status(StatusCodes.OK).json(post);
  } catch (error) {
    logger.error(`findUserPostsHandler :>> ${error}`);
    next(error);
  }
}
