import { Router } from 'express';
import { createUserHandler } from '../../controllers/users/createUser.controller';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import requireUser from '../../middlewares/requireUser';
import validateResource from '../../middlewares/validateResource';

import { createUserSchema } from '../../schemas/user.schema';

const routes = Router();

/**
 * @openapi
 * '/api/post/':
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
