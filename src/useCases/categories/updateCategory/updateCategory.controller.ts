import * as Express from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Path, Put, Request, Route, SuccessResponse, Tags } from 'tsoa';
import { UUID } from '../../../interfaces';
import { UpdateCategoryUseCase } from './updateCategoryUseCase';

@Route('category')
@Tags('categories')
export class UpdateCategoryController {
  constructor(private updateCategoryUseHandler: UpdateCategoryUseCase) {}

  @SuccessResponse(StatusCodes.CONTINUE, ReasonPhrases.CONTINUE)
  @Put('{categoryId}')
  public async handler(
    @Path() categoryId: UUID,
    @Request() request: Express.Request
  ) {
    const { user, title } = request.body;
    await this.updateCategoryUseHandler.execute({ categoryId, title, user });
  }
}
