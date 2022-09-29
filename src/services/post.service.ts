import { getRepository } from 'typeorm';
import PostEntity from '../database/entities/Post.Entity';
import CategoryEntity from '../database/entities/Category.Entity';
import UserEntity from '../database/entities/User.Entity';

interface ICreatePost {
  title: string;
  description: string;
  likes: number;
  category: string;
  owner: string;
}

export async function createPost(input: ICreatePost) {
  const postsRepository = getRepository(PostEntity);
  const categoryRepository = getRepository(CategoryEntity);
  const userRepository = getRepository(UserEntity);

  const category = await categoryRepository.findOne(input.category);
  const owner = await userRepository.findOne(input.owner);

  const post = { ...input, category, owner };

  const newPost = postsRepository.create(post);

  await postsRepository.save(newPost);
  return newPost;
}
