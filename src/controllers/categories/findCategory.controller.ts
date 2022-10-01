import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';
import { ReadCategoryInput } from '../../schemas/category.schema';

import { findCategory } from '../../services/category.service';

export async function findCategoryHandler(
  request: Request<ReadCategoryInput['params'], {}, {}>,
  response: Response,
  next: NextFunction
) {
  try {
    const { categoryId } = request.params;

    const category = await findCategory(categoryId);
    response.status(StatusCodes.OK).json(category);
  } catch (error) {
    logger.error(`findCategoryHandler :>> ${error}`);
    next(error);
  }
}
