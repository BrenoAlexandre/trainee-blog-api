import Post from '../../../database/entities/Post.Entity';

export interface ICreatePostResponse {
  newPost: Post;
}

export interface ICreatePostInput {
  title: string;
  description: string;
  likes: number;
  category: string;
  owner: string;
}
