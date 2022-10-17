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
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         likes:
 *           type: number
 *         category:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             title:
 *               type: string
 *         owner:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *     PostPatch:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - category
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 */

const payload = {
  body: object({
    title: string()
      .defined('Title is required')
      .max(100, 'Title should not be more than 100 characters long'),
    description: string().defined('Description is required'),
    likes: number().typeError('Likes must be a number').default(0),
    category: string().defined('A post related to a category'),
  }).defined(),
};

const params = {
  params: object({
    postId: string().defined('postId is required'),
  }),
};

const postsQueryParams = {
  params: object({
    page: string().defined('Page number is required'),
    take: string().defined('Take number must be at least 0'),
  }),
};

const categoryPostsParams = {
  params: object({
    categoryId: string().defined('categoryId is required'),
  }),
};

const userPostsParams = {
  params: object({
    userId: string().defined('userId is required'),
  }),
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

export const getPaginatedPostsSchema = object({
  ...postsQueryParams,
});

export const getCategoryPostsSchema = object({
  ...categoryPostsParams,
});

export const getUserPostsSchema = object({
  ...userPostsParams,
});

export type CreatePostInput = InferType<typeof createPostSchema>;
export type UpdatePostInput = InferType<typeof updatePostSchema>;
export type ReadPostInput = InferType<typeof getPostSchema>;
export type ReadPaginatedPostsInput = InferType<typeof getPaginatedPostsSchema>;
export type ReadCategoryPostsInput = InferType<typeof getCategoryPostsSchema>;
export type ReadUserPostsInput = InferType<typeof getUserPostsSchema>;
export type DeletePostInput = InferType<typeof deletePostSchema>;
