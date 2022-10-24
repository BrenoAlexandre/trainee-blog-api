import { injectable } from 'tsyringe';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import {
  Body,
  Controller,
  OperationId,
  Path,
  Put,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { IAuthRequest } from '../../../interfaces';
import { IUnprocess } from '../../../interfaces/httpStatus';
import { IUpdateInput } from './interfaces';
import { UpdatePostRequestDTO } from './updatePostRequestDTO';
import { UpdatePostUseCase } from './updatePostUseCase';

@injectable()
@Route('post')
export class UpdatePostController extends Controller {
  constructor(private updatePostUseCase: UpdatePostUseCase) {
    super();
  }

  /**
   * Editar o título, descrição e categoria de uma publicação.
   * @summary Editar os dados de uma publicação
   * @param postId id da publicação
   * @example postId "f05d5b2f-5056-4029-93fa-b1fe9dcaa158"
   */
  @Tags('Posts')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Response<IUnprocess>(422, 'Unprocess', {
    message: 'Unable to update post',
    error: [],
  })
  @Put('{postId}')
  @Security('bearer')
  @OperationId('UpdatePost')
  public async handler(
    @Path() postId: string,
    @Body() request: UpdatePostRequestDTO,
    @Request() req: IAuthRequest
  ) {
    const { title, description, category } = request;
    const { user } = req;

    const data: IUpdateInput = {
      title,
      description,
      categoryId: category,
      postId,
      ownerId: user.id,
    };

    await this.updatePostUseCase.execute(data);
  }
}
