import { ReasonPhrases, StatusCodes } from 'http-status-codes';
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
import { INotFound, IUnauthorized } from '../../../interfaces/httpStatus';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

@Route('category')
export class DeleteCategoryController extends Controller {
  constructor(private deleteCategoryUseCase: DeleteCategoryUseCase) {
    super();
  }

  /**
   * Deleta uma categoria pelo parâmetro indicado na rota.
   * @summary Deleta uma categoria
   * @param categoryId
   */
  @Tags('categories')
  @SuccessResponse(StatusCodes.CONTINUE, ReasonPhrases.CONTINUE)
  @Response<IUnauthorized>(401, 'Unauthorized', {
    message: 'You dont have permission to delete a category',
    error: [],
  })
  @Response<INotFound>(404, 'Not found', {
    message: 'Category not found',
    error: [],
  })
  @Security('bearer')
  @Delete('{categoryId}')
  @OperationId('DeleteCategory')
  public async handler(
    @Path() categoryId: UUID,
    @Request() request: IAuthRequest
  ) {
    const { user } = request;
    await this.deleteCategoryUseCase.execute({ categoryId, user });
  }
}
