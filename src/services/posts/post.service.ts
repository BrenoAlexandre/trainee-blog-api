import postRepository from '../../database/repositories/post.repository';
import { CustomError } from '../../utils/customError.util';

interface ICreatePostInput {
  title: string;
  description: string;
  likes: number;
  category: string;
  owner: string;
}

interface IDeleteInput {
  postId: string;
  userId: string;
}

export async function createPost(input: ICreatePostInput) {
  const newPost = await postRepository.createPost(input);
  return newPost;
}

export async function findPosts() {
  const posts = await postRepository.findPosts();
  return posts;
}

export async function deletePost(input: IDeleteInput) {
  const { postId, userId } = input;
  const deleted = await postRepository.deletePost(postId, userId);

  if (!deleted) throw CustomError.unprocess('Unable to delete post');
}
