import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import {
  Controller,
  Get,
  OperationId,
  Path,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { UUID } from '../../../interfaces';
import { INotFound } from '../../../interfaces/httpStatus';
import { FindCategoryResponseDTO } from './findCategoryResponseDTO';
import { FindCategoryUseCase } from './findCategoryUseCase';

@Route('category')
export class FindCategoryController extends Controller {
  constructor(private findCategoryUseCase: FindCategoryUseCase) {
    super();
  }

  /**
   * Encontra uma categoria e seus posts pelo parâmetro indicado na rota.
   * @summary Encontra uma categoria
   * @param categoryId
   */
  @Tags('categories')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Response<INotFound>(404, 'Not found', {
    message: 'Category not found',
    error: [],
  })
  @Security('bearer')
  @Get('{categoryId}')
  @OperationId('FindCategory')
  public async handler(
    @Path() categoryId: UUID
  ): Promise<FindCategoryResponseDTO> {
    const category: FindCategoryResponseDTO =
      await this.findCategoryUseCase.execute(categoryId);
    return category;
  }
}
