import { singleton } from 'tsyringe';
import Post from '../../../database/entities/Post.Entity';
import { EErrorMessages, IUseCase } from '../../../interfaces';
import { ICreatePostInput } from './interfaces';
import { CustomError } from '../../../utils/customError.util';
import { PostRepository } from '../../../services/implementation/PostRepository';

@singleton()
export default class CreatePostUseCase implements IUseCase {
  constructor(private postRepository: PostRepository) {}

  public async execute(input: ICreatePostInput): Promise<Post> {
    const newPost = await this.postRepository.createPost(input);

    if (!newPost)
      throw CustomError.unprocessable(EErrorMessages.INVALID_OPERATION, {
        message: 'Unable to create post',
      });
    return newPost;
  }
}
