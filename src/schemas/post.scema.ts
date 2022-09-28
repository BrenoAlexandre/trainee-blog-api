import { object, string, number, InferType } from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - likes
 *        - category
 *        - owner
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         likes:
 *           type: number
 *         category:
 *           type: string
 *         owner:
 *           type: string
 */

const payload = {
  body: object({
    title: string()
      .defined('Title is required')
      .max(100, 'Title should not be more than 100 characters long'),
    description: string().defined('Description is required'),
    likes: number().typeError('Likes must be a number').default(0),
    categoryId: string().defined('A post must have a category'),
  }).defined(),
};

const params = {
  params: object({ postId: string().defined('postId is required') }),
};

export const createPostSchema = object({
  ...payload,
});

export const updatePostSchema = object({
  ...payload,
  ...params,
});

export const deletePostSchema = object({
  ...params,
});

export const getPostSchema = object({
  ...params,
});

export type CreatePostInput = InferType<typeof createPostSchema>;
export type UpdatePostInput = InferType<typeof updatePostSchema>;
export type ReadPostInput = InferType<typeof getPostSchema>;
export type DeletePostInput = InferType<typeof deletePostSchema>;
