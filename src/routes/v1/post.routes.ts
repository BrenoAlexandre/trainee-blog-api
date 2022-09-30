import { Router } from 'express';
import { createPostHandler } from '../../controllers/posts/createPost.controller';
import { findPostsHandler } from '../../controllers/posts/findPosts.controller';
import { deletePostHandler } from '../../controllers/posts/deletePost.controller';
import requireUser from '../../middlewares/requireUser';
import validateResource from '../../middlewares/validateResource';

import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
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
 *       400:
 *         description: Bad Request
 *  get:
 *     tags:
 *     - Posts
 *     summary: Return public posts
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Post'
 *       404:
 *         description: Posts not found
 */

routes
  .route('/')
  .get(findPostsHandler)
  .post([requireUser, validateResource(createPostSchema)], createPostHandler);

routes
  .route('/:postId')
  .get([validateResource(getPostSchema)])
  .put([requireUser, validateResource(updatePostSchema)])
  .delete([requireUser, validateResource(deletePostSchema)], deletePostHandler);

export default routes;
