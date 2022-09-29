import { Router } from 'express';
import { createPostHandler } from '../../controllers/posts/createPost.controller';
import { findPostsHandler } from '../../controllers/posts/findPosts.controller';
import requireUser from '../../middlewares/requireUser';
import validateResource from '../../middlewares/validateResource';

import { createUserSchema } from '../../schemas/user.schema';

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
  .get(requireUser, findPostsHandler)
  .post([requireUser, validateResource(createUserSchema)], createPostHandler);

export default routes;
