import { UUID } from '../../../interfaces';
/**
 * @example{
 *  "id": "6315e319-67fd-46a4-9c70-c858c41399b4",
 *  "title": "Pair programing tips",
 *  "owner": "6b65489c-2f00-40f2-a117-5b95857f23f5",
 *  "created_at": "2022-10-21T18:39:09.394Z"
 * }
 */
export interface ICreateCategoryResponseDTO {
  id: UUID;
  title: string;
  owner: string;
  created_at: Date;
}
