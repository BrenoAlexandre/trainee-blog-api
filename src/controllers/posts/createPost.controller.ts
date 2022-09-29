import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreatePostInput } from '../../schemas/post.scema';

import { createPost } from '../../services/posts/post.service';

export async function createPosttHandler(
  request: Request<{}, {}, CreatePostInput['body']>,
  response: Response
) {
  const { user } = response.locals;
  const { body } = request;
  const { title, description, categoryId, likes = 0 } = body;

  const data = { title, description, likes, categoryId, ownerId: user.id };

  const post = await createPost(data);
  response.status(StatusCodes.CREATED).json(post);
}
