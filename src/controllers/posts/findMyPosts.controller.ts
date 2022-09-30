import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';

import { findMyPosts } from '../../services/posts/post.service';

export async function findMyPostsHandler(
  request: Request<{}, {}, {}>,
  response: Response,
  next: NextFunction
) {
  try {
    const { user } = response.locals;
    const { id } = user;

    const post = await findMyPosts(id.toString());
    response.status(StatusCodes.OK).json(post);
  } catch (error) {
    logger.error(`findMyPostsHandler :>> ${error}`);
    next(error);
  }
}
