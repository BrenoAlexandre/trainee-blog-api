import { UUID } from '../../../interfaces';

/**
 * @example{
 *  "id": "03f5da32-47c7-4b75-a016-441b3da26c48",
 *  "title": "O que aprender?",
 *  "description": "Estou começando hoje. O que devo aprender?",
 *  "likes": 0,
 *  "categoryId": "adac0e9d-de2b-4a0a-baff-b02f812d8e5f",
 *  "ownerId": "b5c33998-9e4a-401c-bb2c-7aeecd7cf18b",
 *  "created_at": "2022-10-22T21:34:51.456Z",
 *  "updated_at": "2022-10-22T21:34:51.456Z"
 * }
 */
export interface CreatePostResponseDTO {
  id: UUID;
  title: string;
  description: string;
  likes: number;
  categoryId: UUID;
  ownerId: UUID;
  created_at: Date;
  updated_at: Date;
}
