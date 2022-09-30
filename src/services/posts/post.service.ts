import postRepository from '../../database/repositories/post.repository';
import { CustomError } from '../../utils/customError.util';

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

  if (!newPost) throw CustomError.badRequest('Unable to create post');
  return newPost;
}

export async function findPosts() {
  const posts = await postRepository.findPosts();

  if (posts.length === 0) throw CustomError.badRequest('Posts not found');
  return posts;
}

export async function findPost(postId: string) {
  const post = await postRepository.findPostById(postId);

  if (!post) throw CustomError.badRequest('Post not found');
  return post;
}

export async function patchPost(input: IPatchInput) {
  const post = await postRepository.patchPost(input);

  if (post === 0) {
    throw CustomError.unprocess('Unable to update post');
  }
  return post;
}

export async function findMyPosts(ownerId: string) {
  const post = await postRepository.findPostsByOwner(ownerId);

  if (!post) throw CustomError.badRequest('Post not found');
  return post;
}

export async function deletePost(input: IDeleteInput) {
  const { postId, userId } = input;
  const deleted = await postRepository.deletePost(postId, userId);

  if (!deleted) throw CustomError.unprocess('Unable to delete post');
  return deleted;
}
