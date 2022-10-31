import { injectable } from 'tsyringe';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import {
  Controller,
  Get,
  OperationId,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { INotFound } from '../../../interfaces/httpStatus';
import { FindCategoriesResponseDTO } from './findCategoriesResponseDTO';
import { FindCategoriesUseCase } from './findCategoriesUseCase';

@injectable()
@Route('category')
export class FindCategoriesController extends Controller {
  constructor(private findCategoriesUseCase: FindCategoriesUseCase) {
    super();
  }

  /**
   * Retorna todas as categorias e suas publicações.
   * @summary Busca todas categorias
   */
  @Tags('categories')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Response<INotFound>(404, 'Not found', {
    message: 'CATEGORY_NOT_FOUND',
    error: ['Categories not found'],
  })
  @Security('bearer')
  @Get()
  @OperationId('FindCategories')
  public async handler() {
    const categories: FindCategoriesResponseDTO =
      await this.findCategoriesUseCase.execute();

    return categories;
  }
}
