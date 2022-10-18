import { NextFunction, Request, Response, Router } from 'express';
import createCategoryController from '../../useCases/categories/createCategory';
import findCategoriesController from '../../useCases/categories/findCategories';
import findCategoryController from '../../useCases/categories/findCategory';
import updateCategoryController from '../../useCases/categories/updateCategory';
import deleteCategoryController from '../../useCases/categories/deleteCategory';
import requireUser from '../../middlewares/requireUser';
import validateResource from '../../middlewares/validateResource';

import {
  createCategorySchema,
  DeleteCategoryInput,
  deleteCategorySchema,
  ReadCategoryInput,
  UpdateCategoryInput,
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
 *           $ref: '#/components/schemas/CategoryPost'
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
    (req: Request, res: Response, next: NextFunction) => {
      createCategoryController.handler(req, res, next);
    }
  )
  .get((req: Request, res: Response, next: NextFunction) => {
    findCategoriesController.handler(req, res, next);
  });

routes
  .route('/:categoryId')
  .get(
    (
      req: Request<ReadCategoryInput['params'], {}, {}>,
      res: Response,
      next: NextFunction
    ) => {
      findCategoryController.handler(req, res, next);
    }
  )
  .put(
    [requireUser, validateResource(updateCategorySchema)],
    (
      req: Request<
        UpdateCategoryInput['params'],
        {},
        UpdateCategoryInput['body']
      >,
      res: Response,
      next: NextFunction
    ) => {
      updateCategoryController.handler(req, res, next);
    }
  )
  .delete(
    [requireUser, validateResource(deleteCategorySchema)],
    (
      req: Request<DeleteCategoryInput['params'], {}, {}>,
      res: Response,
      next: NextFunction
    ) => {
      deleteCategoryController.handler(req, res, next);
    }
  );

export default routes;
