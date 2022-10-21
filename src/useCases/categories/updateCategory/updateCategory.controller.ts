import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import {
  Body,
  Controller,
  OperationId,
  Path,
  Put,
  Request,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { IAuthRequest, UUID } from '../../../interfaces';
import {
  IBadRequest,
  INotFound,
  IUnauthorized,
} from '../../../interfaces/httpStatus';
import { UpdateCategoryRequestDTO } from './updateCategoryRequestDTO';
import { UpdateCategoryUseCase } from './updateCategoryUseCase';

@Route('category')
export class UpdateCategoryController extends Controller {
  constructor(private updateCategoryUseHandler: UpdateCategoryUseCase) {
    super();
  }

  /**
   * Edita o título da categoria indicada pelo id na rota, pelo título enviado no body da requisição. <br>
   * Uma categoria só pode ter seu título atualizado se não tiver publicações relacionadas à ela.
   * @summary Edita o título publicação
   * @param categoryId
   */
  @Tags('categories')
  @SuccessResponse(StatusCodes.CONTINUE, ReasonPhrases.CONTINUE)
  @Response<IBadRequest>(400, 'Bad request', {
    message: 'You cant update a category with post associated to it',
    error: [],
  })
  @Response<IUnauthorized>(401, 'Unauthorized', {
    message: 'You dont have permission to update a category',
    error: [],
  })
  @Response<INotFound>(404, 'Not found', {
    message: 'Category not found',
    error: [],
  })
  @Put('{categoryId}')
  @OperationId('UpdateCategory')
  public async handler(
    @Path() categoryId: UUID,
    @Body() request: UpdateCategoryRequestDTO,
    @Request() req: IAuthRequest
  ) {
    const { title } = request;
    const { user } = req;
    await this.updateCategoryUseHandler.execute({ categoryId, title, user });
  }
}
