import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';

import { findPosts } from '../../services/posts/post.service';

export async function findPostsHandler(
  request: Request<{}, {}, {}>,
  response: Response,
  next: NextFunction
) {
  try {
    const posts = await findPosts();
    response.status(StatusCodes.OK).json(posts);
  } catch (error) {
    logger.error(`findPostsHandler :>> ${error}`);
    next(error);
  }
}
