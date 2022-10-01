import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { UpdateCategoryInput } from '../../schemas/category.schema';

import { updateCategory } from '../../services/category.service';

export async function updateCategoryHandler(
  request: Request<
    UpdateCategoryInput['params'],
    {},
    UpdateCategoryInput['body']
  >,
  response: Response,
  next: NextFunction
) {
  try {
    const { user } = response.locals;
    const { categoryId } = request.params;
    const { title } = request.body;

    await updateCategory(categoryId, title, user);
    response.status(StatusCodes.CONTINUE).send();
  } catch (error) {
    logger.error(`updateCategoryHandler :>> ${error}`);
    next(error);
  }
}
