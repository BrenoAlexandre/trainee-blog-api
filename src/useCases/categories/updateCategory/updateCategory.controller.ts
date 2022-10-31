import { injectable } from 'tsyringe';
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
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { IAuthRequest, UUID } from '../../../interfaces';
import {
  INotFound,
  IForbidden,
  IUnprocessable,
} from '../../../interfaces/httpStatus';
import { UpdateCategoryRequestDTO } from './updateCategoryRequestDTO';
import { UpdateCategoryUseCase } from './updateCategoryUseCase';

@injectable()
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
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Response<IUnprocessable>(422, 'Unprocessable entity', {
    message: 'INVALID_OPERATION',
    error: [`You  can't update a category with post associated to it`],
  })
  @Response<IForbidden>(403, 'Forbidden', {
    message: 'FORBIDDEN_OPERATION',
    error: [`You  don't have permission to update a category`],
  })
  @Response<INotFound>(404, 'Not found', {
    message: 'CATEGORY_NOT_FOUND',
    error: ['Category not found'],
  })
  @Security('bearer')
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
