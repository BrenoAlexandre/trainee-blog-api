import Post from '../../../database/entities/Post.Entity';

export interface FindPostsResponseDTO {
  data: Post[];
  previous: number;
  next: number;
}
