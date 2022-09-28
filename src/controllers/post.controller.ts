import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreatePostInput } from '../schemas/post.scema';

import { createPost } from '../services/post.service';

export async function createPosttHandler(
  request: Request<{}, {}, CreatePostInput['body']>,
  response: Response
) {
  const { body } = request;
  const product = await createPost({ ...body });

  response.status(StatusCodes.CREATED).json(product);
}
