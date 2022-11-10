import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import {
  Route,
  SuccessResponse,
  Post,
  Request,
  Tags,
  OperationId,
  Controller,
  Body,
  Response,
  Security,
  Example,
} from 'tsoa';
import { injectable } from 'tsyringe';
import { IAuthRequest } from '../../../interfaces';
import { IUnprocessable } from '../../../interfaces/httpStatus';
import { ICreatePost } from '../../../models/post.model';
import { CreatePostRequestDTO } from './createPostRequestDTO';
import { CreatePostResponseDTO } from './createPostResponseDTO';
import CreatePostUseCase from './createPostUseCase';

@injectable()
@Route('post')
export class CreatePostController extends Controller {
  constructor(private createPostUseCase: CreatePostUseCase) {
    super();
  }

  /**
   * Cria uma nova publicação a partir dos dados enviados.
   * @summary Cria uma publicação
   */
  @Tags('Posts')
  @Example<CreatePostResponseDTO>({
    id: '03f5da32-47c7-4b75-a016-441b3da26c48',
    title: 'O que aprender?',
    description: 'Estou começando hoje. O que devo aprender?',
    likes: 0,
    categoryId: 'adac0e9d-de2b-4a0a-baff-b02f812d8e5f',
    ownerId: 'b5c33998-9e4a-401c-bb2c-7aeecd7cf18b',
    created_at: new Date('2022-10-22T21:34:51.456Z'),
    updated_at: new Date('2022-10-22T21:34:51.456Z'),
  })
  @SuccessResponse(StatusCodes.CREATED, ReasonPhrases.CREATED)
  @Response<IUnprocessable>(422, 'Unprocessable entity', {
    message: 'INVALID_OPERATION',
    error: ['Unable to create post'],
  })
  @Security('bearer')
  @Post()
  @OperationId('CreatePost')
  public async handler(
    @Body() request: CreatePostRequestDTO,
    @Request() req: IAuthRequest
  ): Promise<CreatePostResponseDTO> {
    const { title, description, category } = request;
    const { user } = req;

    const data: ICreatePost = {
      title,
      description,
      categoryId: category,
      ownerId: user.id,
    };

    const newPost: CreatePostResponseDTO = await this.createPostUseCase.execute(
      data
    );
    return newPost;
  }
}
