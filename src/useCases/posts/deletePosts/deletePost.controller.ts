import { injectable } from 'tsyringe';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import {
  Controller,
  Delete,
  OperationId,
  Path,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { IAuthRequest, UUID } from '../../../interfaces';
import { IUnprocessable } from '../../../interfaces/httpStatus';
import { DeletePostUseCase } from './deletePostUseCase';

@injectable()
@Route('post')
export class DeletePostController extends Controller {
  constructor(private deletePostUseCase: DeletePostUseCase) {
    super();
  }

  /**
   * Deleta uma publicação pelo id indicado na rota.
   * @summary Deleta uma publicação
   * @param postId
   */
  @Tags('Posts')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Response<IUnprocessable>(422, 'Unprocessable entity', {
    message: 'INVALID_OPERATION',
    error: ['Unable to delete post'],
  })
  @Security('bearer')
  @Delete('{postId}')
  @OperationId('DeletePost')
  public async handler(@Path() postId: UUID, @Request() request: IAuthRequest) {
    const { user } = request;
    const data = { postId, userId: user.id };
    await this.deletePostUseCase.execute(data);
  }
}
