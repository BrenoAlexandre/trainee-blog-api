import Post from '../../database/entities/Post.Entity';
import postRepository from '../../database/repositories/post.repository';
import { IUseCase } from '../../interfaces/IUseCase';
import { ICreatePostInput } from './interfaces';
import { CustomError } from '../../utils/customError.util';

export default class CreatePostUseCase implements IUseCase {
  public async execute(input: ICreatePostInput): Promise<Post> {
    const newPost = await postRepository.createPost(input);

    if (!newPost) throw CustomError.unprocess('Unable to create post');
    return newPost;
  }
}
