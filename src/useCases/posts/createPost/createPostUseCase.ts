import { singleton } from 'tsyringe';
import { EErrorMessages, IUseCase } from '../../../interfaces';
import { CustomError } from '../../../utils/customError.util';
import { PostService } from '../../../services/implementation/PostService';
import { ICreatePost } from '../../../models/post.model';
import { CreatePostResponseDTO } from './createPostResponseDTO';

@singleton()
export default class CreatePostUseCase implements IUseCase {
  constructor(private postRepository: PostService) {}

  public async execute(input: ICreatePost): Promise<CreatePostResponseDTO> {
    const newPost = await this.postRepository.createPost(input);

    if (!newPost)
      throw CustomError.unprocessable(EErrorMessages.INVALID_OPERATION, {
        message: 'Unable to create post',
      });

    const response = {
      id: newPost.id,
      title: newPost.title,
      description: newPost.description,
      likes: newPost.likes,
      categoryId: newPost.category,
      ownerId: newPost.owner,
      created_at: newPost.created_at,
      updated_at: newPost.updated_at,
    };

    return response;
  }
}
