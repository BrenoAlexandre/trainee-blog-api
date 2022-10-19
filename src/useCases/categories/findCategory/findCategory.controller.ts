import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Get, Path, Route, SuccessResponse, Tags } from 'tsoa';
import { UUID } from '../../../interfaces';
import { FindCategoryUseCase } from './findCategoryUseCase';

@Route('category')
@Tags('categories')
export class FindCategoryController {
  constructor(private findCategoryUseCase: FindCategoryUseCase) {}

  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Get('{categoryId}')
  public async handler(@Path() categoryId: UUID) {
    const category = await this.findCategoryUseCase.execute(categoryId);
    return category;
  }
}
