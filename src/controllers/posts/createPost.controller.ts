import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreatePostInput } from '../../schemas/post.scema';

import { createPost } from '../../services/post.service';

export async function createPosttHandler(
  request: Request<{}, {}, CreatePostInput['body']>,
  response: Response
) {
  const { user } = response.locals;
  const { body } = request;
  const { title, description, category, likes = 0 } = body;
  const data = { title, description, likes, category, owner: user.id };
  const product = await createPost(data);

  response.status(StatusCodes.CREATED).json(product);
}
