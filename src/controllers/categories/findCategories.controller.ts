import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger';

import { findCategories } from '../../services/categories/category.service';

export async function findCategoriesHandler(
  request: Request<{}, {}, {}>,
  response: Response,
  next: NextFunction
) {
  try {
    const categories = await findCategories();
    response.status(StatusCodes.OK).json(categories);
  } catch (error) {
    logger.error('findCategoriesHandler', error);
    next();
  }
}
