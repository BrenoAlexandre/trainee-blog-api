import PostEntity from '../../database/entities/Post.Entity';
import postRepository from '../../database/repositories/post.repository';
import { IFindParams, IPostRepository } from '../../interfaces';
import { ICreatePost, IUpdatePost } from '../../models/post.model';

export class PostRepository implements IPostRepository {
  public createPost = async (data: ICreatePost): Promise<PostEntity> => {
    const newPost = await postRepository.createPost(data);
    return newPost;
  };

  public findPostById = async (postId: string): Promise<PostEntity | null> => {
    const post = await postRepository.findPostById(postId);
    return post;
  };

  public findPosts = async ({
    pagination,
    order,
  }: IFindParams): Promise<PostEntity[]> => {
    const posts = await postRepository.findPosts({ pagination, order });
    return posts;
  };

  public findPostsByCategory = async (
    categoryId: string,
    order?: 'ASC' | 'DESC' | undefined
  ): Promise<PostEntity[]> => {
    const posts = await postRepository.findPostsByCategory(categoryId, order);
    return posts;
  };

  public findPostsByOwner = async (
    ownerId: string,
    order?: 'ASC' | 'DESC' | undefined
  ): Promise<PostEntity[]> => {
    const posts = await postRepository.findPostsByOwner(ownerId, order);
    return posts;
  };

  public updatePost = async (data: IUpdatePost): Promise<boolean> => {
    const isUpdated = await postRepository.updatePost(data);
    return isUpdated;
  };

  public deletePost = async (
    postId: string,
    userId: string
  ): Promise<boolean> => {
    const isDeleted = await postRepository.deletePost(postId, userId);
    return isDeleted;
  };
}
