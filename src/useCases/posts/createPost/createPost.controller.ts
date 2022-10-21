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
import { IAuthRequest } from '../../../interfaces';
import { IUnprocess } from '../../../interfaces/httpStatus';
import { CreatePostRequestDTO } from './createPostRequestDTO';
import { CreatePostResponseDTO } from './createPostResponseDTO';
import CreatePostUseCase from './createPostUseCase';
import { ICreatePostInput } from './interfaces';

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
    category: 'adac0e9d-de2b-4a0a-baff-b02f812d8e5f',
    owner: 'b5c33998-9e4a-401c-bb2c-7aeecd7cf18b',
    created_at: new Date('2022-10-22T21:34:51.456Z'),
    updated_at: new Date('2022-10-22T21:34:51.456Z'),
  })
  @SuccessResponse(StatusCodes.CREATED, ReasonPhrases.CREATED)
  @Response<IUnprocess>(422, 'Unprocess', {
    message: 'Unable to create post',
    error: [],
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

    const data: ICreatePostInput = {
      title,
      description,
      category,
      owner: user.id,
    };

    const newPost: CreatePostResponseDTO = await this.createPostUseCase.execute(
      data
    );
    return newPost;
  }
}
