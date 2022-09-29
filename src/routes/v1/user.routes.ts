import { Router } from 'express';
import { createUserHandler } from '../../controllers/users/createUser.controller';
import validateResource from '../../middlewares/validateResource';

import { createUserSchema } from '../../schemas/user.schema';

const routes = Router();

/**
 * @openapi
 * '/api/post/':
 *  post:
 *     tags:
 *     - Users
 *     summary: Create a user
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */

routes.route('/').post([validateResource(createUserSchema)], createUserHandler);

export default routes;
