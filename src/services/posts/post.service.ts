import PostRepository from '../../database/repositories/PostRepository';
import CategoryRepository from '../../database/repositories/CategoryRepository';
import UserRepository from '../../database/repositories/UserRepository';

interface ICreatePostInput {
  title: string;
  description: string;
  likes: number;
  categoryId: string;
  ownerId: string;
}

export async function createPost(input: ICreatePostInput) {
  const postsRepository = new PostRepository();
  const categoryRepository = new CategoryRepository();
  const userRepository = new UserRepository();

  const category = await categoryRepository.findCategoryById(input.categoryId);
  const owner = await userRepository.findUserById(input.ownerId);

  if (!category) throw new Error('A post should be related to a category.');
  if (!owner) throw new Error('A post should be related to a user.');

  const post = { ...input, category, owner };

  const newPost = await postsRepository.createPost(post);
  return newPost;
}

export async function findPosts() {
  const repository = new PostRepository();
  const posts = await repository.findPosts();
  return posts;
}
