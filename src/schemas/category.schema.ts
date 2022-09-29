import { object, string, InferType } from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *        - title
 *       properties:
 *         title:
 *           type: string
 */

const payload = {
  body: object({
    title: string().defined('Title is required'),
  }).defined(),
};

const params = {
  params: object({ categoryId: string().defined('categoryId is required') }),
};

export const createCategorySchema = object({
  ...payload,
});

export const updateCategorySchema = object({
  ...payload,
  ...params,
});

export const deleteCategorySchema = object({
  ...params,
});

export const getCategorySchema = object({
  ...params,
});

export type CreateCategoryInput = InferType<typeof createCategorySchema>;
export type UpdateCategoryInput = InferType<typeof updateCategorySchema>;
export type ReadCategoryInput = InferType<typeof getCategorySchema>;
export type DeleteCategoryInput = InferType<typeof deleteCategorySchema>;
