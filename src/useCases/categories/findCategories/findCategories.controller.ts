import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Get, Route, SuccessResponse, Tags } from 'tsoa';
import { FindCategoriesUseCase } from './findCategoriesUseCase';

@Route('category')
@Tags('categories')
export class FindCategoriesController {
  constructor(private findCategoriesUseCase: FindCategoriesUseCase) {}

  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Get()
  public async handler() {
    const categories = await this.findCategoriesUseCase.execute();
    return categories;
  }
}
