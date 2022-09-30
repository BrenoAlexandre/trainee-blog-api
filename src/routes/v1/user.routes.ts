import { Router } from 'express';
import { createUserHandler } from '../../controllers/users/createUser.controller';
import { validateLoginHandler } from '../../controllers/users/validateLogin.controller';
import validateResource from '../../middlewares/validateResource';

import {
  createUserSchema,
  validateLoginSchema,
} from '../../schemas/user.schema';

const routes = Router();

/**
 * @openapi
 * '/api/v1/user/':
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
 *       201:
 *         description: Created
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */

routes.route('/').post([validateResource(createUserSchema)], createUserHandler);
routes
  .route('/login')
  .post([validateResource(validateLoginSchema)], validateLoginHandler);

export default routes;
