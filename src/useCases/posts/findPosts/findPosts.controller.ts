import { injectable } from 'tsyringe';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import {
  Controller,
  Example,
  Get,
  OperationId,
  Query,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { INotFound } from '../../../interfaces/httpStatus';
import { FindPostsResponseDTO } from './findPostsResponseDTO';
import { FindPostsUseCase } from './findPostsUseCase';
import { IPaginationResponse } from './interfaces';

@injectable()
@Route('post')
export class FindPostsController extends Controller {
  constructor(private findPostsUseCase: FindPostsUseCase) {
    super();
  }

  /**
   * Encontra publicações, paginadamente (?).
   * @summary Encontra diversas publicações
   * @param page  Número da página.
   * @example page "1"
   * @param take  Quantidade de publicações requisitadas (É ideal que se mantenha o mesmo).
   * @example take "10"
   *
   */
  @Tags('Posts')
  @Example<FindPostsResponseDTO>({
    data: [
      {
        id: '03f5da32-47c7-4b75-a016-441b3da26c48',
        title: 'O que aprender?',
        description: 'Estou começando hoje. O que devo aprender?',
        likes: 0,
        category: 'adac0e9d-de2b-4a0a-baff-b02f812d8e5f',
        owner: 'b5c33998-9e4a-401c-bb2c-7aeecd7cf18b',
        created_at: new Date('2022-10-22T21:34:51.456Z'),
        updated_at: new Date('2022-10-22T21:34:51.456Z'),
      },
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
    ],
    next: 2,
    previous: 0,
    total: 16,
  })
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Response<INotFound>(404, 'Not found', {
    message: 'POST_NOT_FOUND',
    error: ['Posts not found'],
  })
  @Get()
  @OperationId('FindPosts')
  public async handler(@Query() page: string, @Query() take: string) {
    const data: IPaginationResponse = await this.findPostsUseCase.execute({
      page,
      take,
    });
    return data;
  }
}
