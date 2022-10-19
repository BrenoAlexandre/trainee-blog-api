import * as Express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Post, Request, Route, SuccessResponse, Tags } from 'tsoa';
import { ICreateCategoryResponseDTO } from './createCategoryResponseDTO';
import { CreateCategoryUseCase } from './createCategoryUseCase';
import { ICreateCategoryInput } from './interfaces';

@Route('category')
@Tags('categories')
export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  @SuccessResponse(StatusCodes.CREATED, ReasonPhrases.CREATED)
  @Post()
  public async handler(@Request() request: Express.Request) {
    const { title, user } = request.body;

    const data: ICreateCategoryInput = { title, user };

    const category: ICreateCategoryResponseDTO['newCategory'] =
      await this.createCategoryUseCase.execute(data);

    return category;
  }
}
