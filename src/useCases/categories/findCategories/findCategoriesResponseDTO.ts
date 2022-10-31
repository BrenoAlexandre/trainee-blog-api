import Category from '../../../database/entities/Category.Entity';
/**
 * @example[
 *  {
 *    "id": "6315e319-67fd-46a4-9c70-c858c41399b4",
 *    "title": "Pair programing tips",
 *    "owner": "6b65489c-2f00-40f2-a117-5b95857f23f5",
 *    "posts": [],
 *    "created_at": "2022-10-21T18:39:09.394Z",
 *    "updated_at": "2022-10-22T19:07:44.562Z"
 *  },
 *  {
 *    "id": "adac0e9d-de2b-4a0a-baff-b02f812d8e5f",
 *    "title": "Hexagonal Architecture",
 *    "owner": "6b65489c-2f00-40f2-a117-5b95857f23f5",
 *    "posts": [],
 *    "created_at": "2022-10-21T18:45:02.000Z",
 *    "updated_at": "2022-10-21T18:45:02.000Z"
 *  }
 * ]
 */
export type FindCategoriesResponseDTO = Category[];
