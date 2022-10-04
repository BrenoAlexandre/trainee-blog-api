import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { UpdatePostInput } from '../../schemas/post.schema';

import { patchPost } from '../../services/post.service';

export async function updatePostHandler(
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

    await patchPost(data);
    response.status(StatusCodes.CONTINUE).json({});
  } catch (error) {
    logger.error(`patchPostHandler :>> ${error}`);
    next(error);
  }
}
