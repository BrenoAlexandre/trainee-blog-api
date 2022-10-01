import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { ReadPostInput } from '../../schemas/post.schema';

import { findPost } from '../../services/post.service';

export async function findPostHandler(
  request: Request<ReadPostInput['params'], {}, {}>,
  response: Response,
  next: NextFunction
) {
  try {
    const { postId } = request.params;

    const posts = await findPost(postId);
    response.status(StatusCodes.OK).json(posts);
  } catch (error) {
    logger.error(`findPostHandler :>> ${error}`);
    next(error);
  }
}
