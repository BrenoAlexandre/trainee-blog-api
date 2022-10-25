import Post from '../../../database/entities/Post.Entity';

export interface FindPostsResponseDTO {
  data: Post[];
  previous: number | null;
  next: number | null;
  total: number;
}
