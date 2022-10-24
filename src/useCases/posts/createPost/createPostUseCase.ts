import { singleton } from 'tsyringe';
import Post from '../../../database/entities/Post.Entity';
import { IPostRepository, IUseCase } from '../../../interfaces';
import { ICreatePostInput } from './interfaces';
import { CustomError } from '../../../utils/customError.util';

@singleton()
export default class CreatePostUseCase implements IUseCase {
  constructor(private postRepository: IPostRepository) {}

  public async execute(input: ICreatePostInput): Promise<Post> {
    const newPost = await this.postRepository.createPost(input);

    if (!newPost) throw CustomError.unprocess('Unable to create post');
    return newPost;
  }
}
