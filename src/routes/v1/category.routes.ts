import { Router } from 'express';
import { createCategoryHandler } from '../../controllers/categories/createCategory.controller';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import requireUser from '../../middlewares/requireUser';
import validateResource from '../../middlewares/validateResource';

import { createCategorySchema } from '../../schemas/category.schema';

const routes = Router();

/**
 * @openapi
 * '/api/post/':
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
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Category'
 *       404:
 *         description: User not found
 */

routes.route('/').post(
  // [requireUser, validateResource(createProductSchema)],
  [validateResource(createCategorySchema)],
  createCategoryHandler
);

export default routes;
