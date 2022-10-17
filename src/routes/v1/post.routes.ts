import { Router, NextFunction, Request, Response } from 'express';
import createPostController from '../../useCases/posts/createPost';
import findPostsController from '../../useCases/posts/findPosts';
import findPostController from '../../useCases/posts/findPost';
import deletePostController from '../../useCases/posts/deletePosts';
import updatePostController from '../../useCases/posts/updatePost';
import findCategoryPostsController from '../../useCases/posts/findCategoryPosts';
import findUserPostsController from '../../useCases/posts/findUserPosts';
import requireUser from '../../middlewares/requireUser';
import validateResource from '../../middlewares/validateResource';

import {
  createPostSchema,
  DeletePostInput,
  deletePostSchema,
  getPostSchema,
  ReadCategoryPostsInput,
  ReadPaginatedPostsInput,
  ReadPostInput,
  ReadUserPostsInput,
  UpdatePostInput,
  updatePostSchema,
} from '../../schemas/post.schema';

const routes = Router();

/**
 * @openapi
 * '/api/v1/post/':
 *  post:
 *     tags:
 *     - Posts
 *     summary: Create a post
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *           $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Post'
 *       404:
 *         description: Not Found
 * '/api/v1/post/:postId':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Return a single post
 *     parameters:
 *     - in: path
 *       name: postId
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Post'
 *       404:
 *         description: Not Found
 *  put:
 *     tags:
 *     - Posts
 *     summary: Update post data
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: postId
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *           $ref: '#/components/schemas/PostPatch'
 *     responses:
 *       100:
 *         description: Continue
 *       404:
 *         description: Not Found
 *  delete:
 *     tags:
 *     - Posts
 *     summary: Delete a post
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: postId
 *     responses:
 *       100:
 *         description: Continue
 *       404:
 *         description: Not Found
 * '/api/v1/post/myPosts':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Return posts for the signed user
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Post'
 *       404:
 *         description: Posts not found
 * '/api/v1/post/category/:categoryId':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Return all posts from a category
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: categoryId
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Post'
 *       404:
 *         description: Posts not found
 * '/api/v1/post/user/:userId':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Return all posts from a user
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: userId
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Post'
 *       404:
 *         description: Posts not found
 * '/api/v1/post/page=:page&take=:take':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Return public posts
 *     parameters:
 *     - in: path
 *       name: page
 *     - in: path
 *       name: take
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *              data:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Post'
 *              previous:
 *                type: number
 *              next:
 *                type: number
 *       404:
 *         description: Not Found
 */

routes
  .route('/category/:categoryId')
  .get(
    [requireUser],
    (
      req: Request<ReadCategoryPostsInput['params'], {}, {}>,
      res: Response,
      next: NextFunction
    ) => {
      findCategoryPostsController.handler(req, res, next);
    }
  );

routes
  .route('/user/:userId')
  .get(
    [requireUser],
    (
      req: Request<ReadUserPostsInput['params'], {}, {}>,
      res: Response,
      next: NextFunction
    ) => {
      findUserPostsController.handler(req, res, next);
    }
  );

routes
  .route('/')
  .post(
    [requireUser, validateResource(createPostSchema)],
    (req: Request, res: Response, next: NextFunction) => {
      createPostController.handler(req, res, next);
    }
  );

routes
  .route('/page=:page&take=:take')
  .get(
    (
      req: Request<ReadPaginatedPostsInput['params'], {}, {}>,
      res: Response,
      next: NextFunction
    ) => {
      findPostsController.handler(req, res, next);
    }
  );

routes
  .route('/:postId')
  .get(
    [validateResource(getPostSchema)],
    (
      req: Request<ReadPostInput['params'], {}, {}>,
      res: Response,
      next: NextFunction
    ) => {
      findPostController.handler(req, res, next);
    }
  )
  .put(
    [requireUser, validateResource(updatePostSchema)],
    (
      req: Request<UpdatePostInput['params'], {}, UpdatePostInput['body']>,
      res: Response,
      next: NextFunction
    ) => {
      updatePostController.handler(req, res, next);
    }
  )
  .delete(
    [requireUser, validateResource(deletePostSchema)],
    (
      req: Request<DeletePostInput['params']>,
      res: Response,
      next: NextFunction
    ) => {
      deletePostController.handler(req, res, next);
    }
  );

export default routes;
