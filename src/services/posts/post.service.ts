import postRepository from '../../database/repositories/post.repository';

interface ICreatePostInput {
  title: string;
  description: string;
  likes: number;
  category: string;
  owner: string;
}

export async function createPost(input: ICreatePostInput) {
  const newPost = await postRepository.createPost(input);
  return newPost;
}

export async function findPosts() {
  const posts = await postRepository.findPosts();
  return posts;
}
