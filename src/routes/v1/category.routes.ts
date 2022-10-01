import { Router } from 'express';
import { createCategoryHandler } from '../../controllers/categories/createCategory.controller';
import { findCategoriesHandler } from '../../controllers/categories/findCategories.controller';
import { findCategoryHandler } from '../../controllers/categories/findCategory.controller';
import { updateCategoryHandler } from '../../controllers/categories/updateCategory.controller';
import { deleteCategoryHandler } from '../../controllers/categories/deleteCategory.controller';
import requireUser from '../../middlewares/requireUser';
import validateResource from '../../middlewares/validateResource';

import {
  createCategorySchema,
  deleteCategorySchema,
  updateCategorySchema,
} from '../../schemas/category.schema';

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
 *       401:
 *         description: Unauthorized
 *  get:
 *     tags:
 *     - Categories
 *     summary: Return all categories
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Category'
 *       404:
 *         description: Not Found
 * '/api/v1/category/:categoryId':
 *  get:
 *     tags:
 *     - Categories
 *     summary: Find a category
 *     parameters:
 *     - in: path
 *       name: categoryId
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Category'
 *       404:
 *         description: Not Found
 *  put:
 *     tags:
 *     - Categories
 *     summary: Update a category
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: categoryId
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *           $ref: '#/components/schemas/CategoryPut'
 *     responses:
 *       100:
 *         description: Continue
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *  delete:
 *     tags:
 *     - Categories
 *     summary: Delete a post
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: categoryId
 *     responses:
 *       100:
 *         description: Continue
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 */

routes
  .route('/')
  .post(
    [requireUser, validateResource(createCategorySchema)],
    createCategoryHandler
  )
  .get(findCategoriesHandler);

routes
  .route('/:categoryId')
  .get(findCategoryHandler)
  .put(
    [requireUser, validateResource(updateCategorySchema)],
    updateCategoryHandler
  )
  .delete(
    [requireUser, validateResource(deleteCategorySchema)],
    deleteCategoryHandler
  );

export default routes;
