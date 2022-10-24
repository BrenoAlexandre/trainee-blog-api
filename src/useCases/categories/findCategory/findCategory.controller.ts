import { injectable } from 'tsyringe';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import {
  Controller,
  Example,
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

@injectable()
@Route('category')
export class FindCategoryController extends Controller {
  constructor(private findCategoryUseCase: FindCategoryUseCase) {
    super();
  }

  /**
   * Encontra uma categoria e seus posts pelo id indicado na rota.
   * @summary Encontra uma categoria
   * @param categoryId
   */
  @Tags('categories')
  @Example<FindCategoryResponseDTO>({
    id: '6315e319-67fd-46a4-9c70-c858c41399b4',
    title: 'Pair proggraming tips',
    owner: '6b65489c-2f00-40f2-a117-5b95857f23f5',
    posts: [
      {
        id: 'string',
        title: 'Para fazer algo, comecem pelo início',
        description: 'Ipsum Loren Itnus pictorescus...',
        likes: 0,
        category: '6315e319-67fd-46a4-9c70-c858c41399b4',
        owner: '6b65489c-2f00-40f2-a117-5b95857f23f5',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    created_at: new Date('2022-10-21T18:39:09.394Z'),
    updated_at: new Date('2022-10-22T19:07:44.562Z'),
  })
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Response<INotFound>(404, 'Not found', {
    message: 'Category not found',
    error: [],
  })
  @Security('bearer')
  @Get('{categoryId}')
  @OperationId('FindCategory')
  public async handler(@Path() categoryId: UUID) {
    const category: FindCategoryResponseDTO =
      await this.findCategoryUseCase.execute(categoryId);
    return category;
  }
}
