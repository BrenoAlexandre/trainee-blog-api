import { injectable } from 'tsyringe';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import {
  Controller,
  Example,
  Get,
  OperationId,
  Path,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import Post from '../../../database/entities/Post.Entity';
import { INotFound } from '../../../interfaces/httpStatus';
import { FindPostUseCase } from './findPostUseCase';

@injectable()
@Route('post')
export class FindPostController extends Controller {
  constructor(private findPostUseCase: FindPostUseCase) {
    super();
  }

  /**
   * Encontra uma publicação pelo id indicado na rota.
   * @summary Encontra uma publicação
   * @param postId id da publicação.
   * @example postId "03f5da32-47c7-4b75-a016-441b3da26c48"
   */
  @Tags('Posts')
  @Example<Post>({
    id: '03f5da32-47c7-4b75-a016-441b3da26c48',
    title: 'O que aprender?',
    description: 'Estou começando hoje. O que devo aprender?',
    likes: 0,
    category: 'adac0e9d-de2b-4a0a-baff-b02f812d8e5f',
    owner: 'b5c33998-9e4a-401c-bb2c-7aeecd7cf18b',
    created_at: new Date('2022-10-22T21:34:51.456Z'),
    updated_at: new Date('2022-10-22T21:34:51.456Z'),
  })
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Response<INotFound>(404, 'Not found', {
    message: 'Post not found',
    error: [],
  })
  @Get('{postId}')
  @OperationId('FindPost')
  public async handler(@Path() postId: string) {
    const post = await this.findPostUseCase.execute(postId);
    return post;
  }
}
