import postRepository from '../database/repositories/post.repository';
import { IFindParams } from '../interfaces/IFindParams';
import { CustomError } from '../utils/customError.util';

interface ICreatePostInput {
  title: string;
  description: string;
  likes: number;
  category: string;
  owner: string;
}

interface IPatchInput {
  title: string;
  description: string;
  postId: string;
  ownerId: string;
  categoryId: string;
}

interface IDeleteInput {
  postId: string;
  userId: string;
}

export async function createPost(input: ICreatePostInput) {
  const newPost = await postRepository.createPost(input);

  if (!newPost) throw CustomError.unprocess('Unable to create post');
  return newPost;
}

export async function findPosts(findOptions: IFindParams) {
  const posts = await postRepository.findPosts(findOptions);

  if (posts.length === 0) throw CustomError.notFound('Posts not found');
  return posts;
}

export async function findPost(postId: string) {
  const post = await postRepository.findPostById(postId);

  if (!post) throw CustomError.notFound('Post not found');
  return post;
}

export async function patchPost(input: IPatchInput): Promise<boolean> {
  const edited = await postRepository.patchPost(input);

  if (!edited) {
    throw CustomError.unprocess('Unable to update post');
  }
  return edited;
}

export async function findMyPosts(ownerId: string) {
  const post = await postRepository.findPostsByOwner(ownerId);

  if (!post) throw CustomError.notFound('Post not found');
  return post;
}

export async function findCategoryPosts(categoryId: string) {
  const data = await postRepository.findPostsByCategory(categoryId);

  if (!data) throw CustomError.notFound('Posts not found');

  return data;
}

export async function findUserPosts(userId: string) {
  const data = await postRepository.findPostsByOwner(userId);

  if (!data) throw CustomError.notFound('Posts not found');

  return data;
}

export async function deletePost(input: IDeleteInput): Promise<void> {
  const { postId, userId } = input;
  const deleted = await postRepository.deletePost(postId, userId);

  if (!deleted) throw CustomError.unprocess('Unable to delete post');
}
