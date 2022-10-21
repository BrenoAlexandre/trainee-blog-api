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

@Route('category')
export class FindCategoriesController extends Controller {
  constructor(private findCategoriesUseCase: FindCategoriesUseCase) {
    super();
  }

  /**
   * Retorna todas as categorias e seus posts.
   * @summary Busca todas categorias
   */
  @Tags('categories')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Response<INotFound>(404, 'Not found', {
    message: 'Categories not found',
    error: [],
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
