import Post from '../database/entities/Post.Entity';
import { ICreatePost, IUpdatePost } from '../models/post.model';
import { IFindParams } from './IFindParams';

export interface IPostRepository {
  createPost(data: ICreatePost): Promise<Post>;
  findPostById(postId: string): Promise<Post | null>;
  findPosts({ pagination, order }: IFindParams): Promise<Post[]>;
  findPostsByCategory(
    categoryId: string,
    order?: 'ASC' | 'DESC'
  ): Promise<Post[]>;
  findPostsByOwner(ownerId: string, order?: 'ASC' | 'DESC'): Promise<Post[]>;
  updatePost(data: IUpdatePost): Promise<boolean>;
  deletePost(postId: string, userId: string): Promise<boolean>;
}
