import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { UpdatePostInput } from '../../schemas/post.schema';

import { patchPost } from '../../services/posts/post.service';

export async function patchPostHandler(
  request: Request<UpdatePostInput['params'], {}, UpdatePostInput['body']>,
  response: Response,
  next: NextFunction
) {
  try {
    const { user } = response.locals;
    const { body, params } = request;
    const { title, description, category } = body;
    const { postId } = params;

    const data = {
      title,
      description,
      categoryId: category,
      postId,
      ownerId: user.id,
    };

    const post = await patchPost(data);
    response.status(StatusCodes.CONTINUE).json(post);
  } catch (error) {
    logger.error(`patchPostHandler :>> ${error}`);
    next(error);
  }
}
