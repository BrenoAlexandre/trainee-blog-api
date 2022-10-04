import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { ReadCategoryPostsInput } from '../../schemas/post.schema';

import { findCategoryPosts } from '../../services/post.service';

export async function findCategoryPostsHandler(
  request: Request<ReadCategoryPostsInput['params'], {}, {}>,
  response: Response,
  next: NextFunction
) {
  try {
    const { categoryId } = request.params;

    const post = await findCategoryPosts(categoryId);
    response.status(StatusCodes.OK).json(post);
  } catch (error) {
    logger.error(`findCategoryPostsHandler :>> ${error}`);
    next(error);
  }
}
