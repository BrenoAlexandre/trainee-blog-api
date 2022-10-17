import { NextFunction, Request, Response, Router } from 'express';
import createUserController from '../../useCases/users/createUser';
import updateUserController from '../../useCases/users/updateUser';
import validateLoginController from '../../useCases/users/login';
import findUserController from '../../useCases/users/findUser';
import requireUser from '../../middlewares/requireUser';
import validateResource from '../../middlewares/validateResource';

import {
  createUserSchema,
  ReadUserInput,
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
 *  put:
 *     tags:
 *     - Users
 *     summary: Create user
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *       404:
 *         description: Not Found
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
  .post(
    [validateResource(createUserSchema)],
    (req: Request, res: Response, next: NextFunction) => {
      createUserController.handler(req, res, next);
    }
  )
  .put([requireUser], (req: Request, res: Response, next: NextFunction) => {
    updateUserController.handler(req, res, next);
  });

routes
  .route('/:userId')
  .get(
    (
      req: Request<ReadUserInput['params'], {}, {}>,
      res: Response,
      next: NextFunction
    ) => {
      findUserController.handler(req, res, next);
    }
  );

routes
  .route('/login')
  .post(
    [validateResource(validateLoginSchema)],
    (req: Request, res: Response, next: NextFunction) => {
      validateLoginController.handler(req, res, next);
    }
  );

export default routes;
