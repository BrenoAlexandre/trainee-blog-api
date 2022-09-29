import { Router } from 'express';
import { createCategoryHandler } from '../../controllers/categories/createCategory.controller';
import { findCategoriesHandler } from '../../controllers/categories/findCategories.controller';
import requireUser from '../../middlewares/requireUser';
import validateResource from '../../middlewares/validateResource';

import { createCategorySchema } from '../../schemas/category.schema';

const routes = Router();

/**
 * @openapi
 * '/api/v1/category/':
 *  post:
 *     tags:
 *     - Categories
 *     summary: Create a category
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *           $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad Request
 *  get:
 *     tags:
 *     - Categories
 *     summary: Return all categories
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Category'
 *       404:
 *         description: Not Found
 */

routes
  .route('/')
  .get(requireUser, findCategoriesHandler)
  .post(
    [requireUser, validateResource(createCategorySchema)],
    createCategoryHandler
  );

export default routes;
