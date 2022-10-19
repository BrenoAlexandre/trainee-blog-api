import * as Express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Delete, Path, Request, Route, SuccessResponse, Tags } from 'tsoa';
import { UUID } from '../../../interfaces';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

@Route('category')
@Tags('categories')
export class DeleteCategoryController {
  constructor(private deleteCategoryUseCase: DeleteCategoryUseCase) {}

  @SuccessResponse(StatusCodes.CONTINUE, ReasonPhrases.CONTINUE)
  @Delete('{categoryId}')
  public async handler(
    @Path() categoryId: UUID,
    @Request() request: Express.Request
  ) {
    const { user } = request.body;
    await this.deleteCategoryUseCase.execute({ categoryId, user });
  }
}
