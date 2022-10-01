import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { DeletePostInput } from '../../schemas/post.schema';

import { deletePost } from '../../services/post.service';

export async function deletePostHandler(
  request: Request<DeletePostInput['params']>,
  response: Response,
  next: NextFunction
) {
  try {
    const { user } = response.locals;
    const { params } = request;
    const { postId } = params;

    const data = { postId, userId: user.id };

    await deletePost(data);
    response.status(StatusCodes.CONTINUE).send();
  } catch (error) {
    logger.error(`deletePostHandler :>> ${error}`);
    next(error);
  }
}
