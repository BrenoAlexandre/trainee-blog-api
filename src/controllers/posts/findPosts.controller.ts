import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { ReadPaginatedPostsInput } from '../../schemas/post.schema';

import { findPosts } from '../../services/post.service';

export async function findPostsHandler(
  request: Request<ReadPaginatedPostsInput['params'], {}, {}>,
  response: Response,
  next: NextFunction
) {
  try {
    const { page, take } = request.params;
    const pageNumber = parseInt(page, 10);

    const posts = await findPosts({
      pagination: { page: pageNumber, take },
      order: 'ASC',
    });
    const previous = pageNumber < 2 ? 0 : pageNumber - 1;
    const nextPage = pageNumber + 1;
    response.status(StatusCodes.OK).json({
      data: [...posts],
      previous,
      next: nextPage,
    });
  } catch (error) {
    logger.error(`findPostsHandler :>> ${error}`);
    next(error);
  }
}
