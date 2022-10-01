import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { CreatePostInput } from '../../schemas/post.schema';

import { createPost } from '../../services/post.service';

export async function createPostHandler(
  request: Request<{}, {}, CreatePostInput['body']>,
  response: Response,
  next: NextFunction
) {
  try {
    const { user } = response.locals;
    const { body } = request;
    const { title, description, category, likes = 0 } = body;

    const data = { title, description, likes, category, owner: user.id };

    const post = await createPost(data);
    response.status(StatusCodes.CREATED).json(post);
  } catch (error) {
    logger.error(`createPostHandler :>> ${error}`);
    next(error);
  }
}
