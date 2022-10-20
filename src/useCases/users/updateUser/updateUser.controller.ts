import * as Express from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Controller, Put, Request, Route, SuccessResponse, Tags } from 'tsoa';
import { injectable } from 'tsyringe';
import { IUpdateInput } from './interfaces';
import { UpdateUserUseCase } from './updateUserUseCase';

@injectable()
@Route('user')
export class UpdateUserController extends Controller {
  constructor(private updateUserUseCase: UpdateUserUseCase) {
    super();
  }

  @Tags('users')
  @SuccessResponse(StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT)
  @Put()
  public async handler(@Request() request: Express.Request) {
    const { user, name } = request.body;

    const data: IUpdateInput = { name, user };
    await this.updateUserUseCase.execute(data);

    this.setStatus(StatusCodes.NO_CONTENT);
  }
}
