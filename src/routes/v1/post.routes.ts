import { Router } from 'express';
import { createPostHandler } from '../../controllers/posts/createPost.controller';
import { findPostsHandler } from '../../controllers/posts/findPosts.controller';
import { findPostHandler } from '../../controllers/posts/findPost.controller';
import { deletePostHandler } from '../../controllers/posts/deletePost.controller';
import { patchPostHandler } from '../../controllers/posts/patchPost.controller';
import { findMyPostsHandler } from '../../controllers/posts/findMyPosts.controller';
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
 *       404:
 *         description: Not Found
 *  get:
 *     tags:
 *     - Posts
 *     summary: Return public posts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/Post'
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
 *  patch:
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
 */

routes.route('/myPosts').get([requireUser], findMyPostsHandler);

routes
  .route('/')
  .get(findPostsHandler)
  .post([requireUser, validateResource(createPostSchema)], createPostHandler);

routes
  .route('/:postId')
  .get([validateResource(getPostSchema)], findPostHandler)
  .patch([requireUser, validateResource(updatePostSchema)], patchPostHandler)
  .delete([requireUser, validateResource(deletePostSchema)], deletePostHandler);

export default routes;
