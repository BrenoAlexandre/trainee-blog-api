import { getRepository } from 'typeorm';
import PostEntity from '../database/entities/Post.Entity';
import { PostInput } from '../models/post.model';

export async function createPost(input: PostInput) {
  const repository = getRepository(PostEntity);
  const newPost = repository.create(input);
  await repository.save(newPost);
  return newPost;
}
