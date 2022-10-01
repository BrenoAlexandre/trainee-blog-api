import { Router } from 'express';
import { createUserHandler } from '../../controllers/users/createUser.controller';
import { updateUserHandler } from '../../controllers/users/updateUser.controller';
import { validateLoginHandler } from '../../controllers/users/validateLogin.controller';
import requireUser from '../../middlewares/requireUser';
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
 *     summary: Create user
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *           $ref: '#/components/schemas/UserCreation'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request
 * '/api/v1/user/login/':
 *  post:
 *     tags:
 *     - Users
 *     summary: Login
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *           $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: OK - Return authorization headers
 *       404:
 *         description: Not Found
 */

routes
  .route('/')
  .post([validateResource(createUserSchema)], createUserHandler)
  .put([requireUser], updateUserHandler);
routes
  .route('/login')
  .post([validateResource(validateLoginSchema)], validateLoginHandler);

export default routes;
