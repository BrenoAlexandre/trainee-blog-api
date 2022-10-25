import Post from '../../../database/entities/Post.Entity';

export interface IPaginationResponse {
  data: Post[];
  previous: number | null;
  next: number | null;
  total: number;
}
