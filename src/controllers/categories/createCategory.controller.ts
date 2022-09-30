import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { CreateCategoryInput } from '../../schemas/category.schema';

import { createCategory } from '../../services/categories/category.service';

export async function createCategoryHandler(
  request: Request<{}, {}, CreateCategoryInput['body']>,
  response: Response,
  next: NextFunction
) {
  try {
    const { user } = response.locals;
    const { body } = request;
    const { title } = body;

    const data = { title, user };
    const product = await createCategory(data);

    response.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    logger.error(`createCategoryHandler :>> ${error}`);
    next(error);
  }
}
