import { object, string, InferType, mixed } from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *        - name
 *        - email
 *        - password
 *        - role
 *       properties:
 *         name:
 *           type: string
 *           maximun: 120
 *         email:
 *           type: string
 *         password:
 *           type: number
 *         role:
 *           type: string
 *           enum: ['user', 'admin']
 */

const payload = {
  body: object({
    name: string().defined('User name is required').max(120),
    email: string().defined('User email is required').email('Invalid email'),
    password: string().defined('User password is required'),
    role: mixed().oneOf(['user', 'admin']).default('user'),
  }).defined(),
};

const params = {
  params: object({ userId: string().defined('userId is required') }),
};

export const createUserSchema = object({
  ...payload,
});

export const updateUserSchema = object({
  ...payload,
  ...params,
});

export const deleteUserSchema = object({
  ...params,
});

export const getUserSchema = object({
  ...params,
});

export type CreateUserInput = InferType<typeof createUserSchema>;
export type UpdateUserInput = InferType<typeof updateUserSchema>;
export type ReadUserInput = InferType<typeof getUserSchema>;
export type DeleteUserInput = InferType<typeof deleteUserSchema>;
