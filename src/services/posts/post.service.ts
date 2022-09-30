import postRepository from '../../database/repositories/post.repository';
import categoryRepository from '../../database/repositories/category.repository';
import userRepository from '../../database/repositories/user.repository';

interface ICreatePostInput {
  title: string;
  description: string;
  likes: number;
  categoryId: string;
  ownerId: string;
}

export async function createPost(input: ICreatePostInput) {
  const category = await categoryRepository.findCategoryById(input.categoryId);
  const owner = await userRepository.findUserById(input.ownerId);
  if (!category) throw new Error('A post should be related to a category.');
  if (!owner) throw new Error('A post should be related to a user.');

  const post = { ...input, category, owner };

  const newPost = await postRepository.createPost(post);
  return newPost;
}

export async function findPosts() {
  const posts = await postRepository.findPosts();
  return posts;
}
