import Category from '../../../database/entities/Category.Entity';

/**
 * @example{
 *    "id": "6315e319-67fd-46a4-9c70-c858c41399b4",
 *    "title": "Pair programing tips",
 *    "owner": "6b65489c-2f00-40f2-a117-5b95857f23f5",
 *    "posts": [
 *      {
 *        "id": "string",
 *        "title": "Para fazer algo, comecem pelo início",
 *        "description": "Ipsum Loren Itnus picturescus...",
 *        "likes": 0,
 *        "category": "6315e319-67fd-46a4-9c70-c858c41399b4",
 *        "owner": "6b65489c-2f00-40f2-a117-5b95857f23f5",
 *        "created_at": "2022-10-21T20:10:52.434Z",
 *        "updated_at": "2022-10-21T20:10:52.434Z"
 *      }
 *    ],
 *    "created_at": "2022-10-21T18:39:09.394Z",
 *    "updated_at": "2022-10-22T19:07:44.562Z"
 *  }
 */
export type FindCategoryResponseDTO = Category;
