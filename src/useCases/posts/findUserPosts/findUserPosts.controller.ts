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
import { FindUserPostsUseCase } from './findUserPostsUseCase';

@injectable()
@Route('post')
export class FindUserPostsController extends Controller {
  constructor(private findUserPostsUseCase: FindUserPostsUseCase) {
    super();
  }

  /**
   * Encontra todas as publicações de um usuário pelo id indicado na rota.
   * @summary Encontra as publicações de um usuário
   * @param userId id do usuário
   * @eample userId "7a8664fa-f4d3-47b8-83bc-2cce7f9424fa"
   */
  @Tags('Posts')
  @Example<Post[]>([
    {
      id: 'f05d5b2f-5056-4029-93fa-b1fe9dcaa158',
      title: 'Que comunidade linda!',
      description: 'É muito inspirador ver essa união em uma comunid...',
      likes: 0,
      category: 'adac0e9d-de2b-4a0a-baff-b02f812d8e5f',
      owner: '7a8664fa-f4d3-47b8-83bc-2cce7f9424fa',
      created_at: new Date('2022-12-14T14:35:51.356Z'),
      updated_at: new Date('2022-12-14T14:35:51.356Z'),
    },
  ])
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Response<INotFound>(404, 'Not found', {
    message: 'Posts not found',
    error: [],
  })
  @Get('user/{userId}')
  @OperationId('FindUserPosts')
  public async handler(@Path() userId: string) {
    const post = await this.findUserPostsUseCase.execute(userId);
    return post;
  }
}
