import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { DeleteCategoryInput } from '../../schemas/category.schema';

import { deleteCategory } from '../../services/categories/category.service';

export async function deleteCategoryHandler(
  request: Request<DeleteCategoryInput['params'], {}, {}>,
  response: Response,
  next: NextFunction
) {
  try {
    const { user } = response.locals;
    const { categoryId } = request.params;

    const category = await deleteCategory(categoryId, user);
    response.status(StatusCodes.CONTINUE).send({ category });
  } catch (error) {
    logger.error(`deleteCategoryHandler :>> ${error}`);
    next(error);
  }
}
