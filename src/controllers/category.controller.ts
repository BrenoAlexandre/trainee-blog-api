import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateCategoryInput } from '../schemas/category.schema';

import { createCategory } from '../services/category.service';

export async function createCategoryHandler(
  request: Request<{}, {}, CreateCategoryInput['body']>,
  response: Response
) {
  const { user } = response.locals;
  const { body } = request;
  const { title } = body;
  const data = { title, owner: user.id };
  const product = await createCategory(data);

  response.status(StatusCodes.CREATED).json(product);
}
