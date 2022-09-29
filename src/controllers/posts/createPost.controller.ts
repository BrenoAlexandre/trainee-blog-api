import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { CreatePostInput } from '../../schemas/post.scema';

import { createPost } from '../../services/posts/post.service';

export async function createPostHandler(
  request: Request<{}, {}, CreatePostInput['body']>,
  response: Response,
  next: NextFunction
) {
  try {
    const { user } = response.locals;
    const { body } = request;
    const { title, description, categoryId, likes = 0 } = body;

    const data = { title, description, likes, categoryId, ownerId: user.id };

    const post = await createPost(data);
    response.status(StatusCodes.CREATED).json(post);
  } catch (error) {
    logger.error('createPostHandler', error);
    next();
  }
}
