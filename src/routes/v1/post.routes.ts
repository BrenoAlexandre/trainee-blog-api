import { Router } from 'express';
import { createUserHandler } from '../../controllers/user.controller';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import requireUser from '../../middlewares/requireUser';
import validateResource from '../../middlewares/validateResource';

import { createUserSchema } from '../../schemas/user.schema';

const routes = Router();

/**
 * @openapi
 * '/api/post/{postId}':
 *  get:
 *     tags:
 *     - Posts
 *     summary: Get a single post by the postId
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - name: postId
 *        in: path
 *        description: The id of the post
 *        required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */

routes.route('/').post(
  // [requireUser, validateResource(createProductSchema)],
  [validateResource(createUserSchema)],
  createUserHandler
);

export default routes;
