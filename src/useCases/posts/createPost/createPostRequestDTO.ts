import { UUID } from '../../../interfaces';

/**
 * @example{
 *  "title": "O que aprender?",
 *  "description": "Estou começando hoje. O que devo aprender?",
 *  "category": "adac0e9d-de2b-4a0a-baff-b02f812d8e5f"
 * }
 */
export interface CreatePostRequestDTO {
  title: string;
  description: string;
  category: UUID;
}
