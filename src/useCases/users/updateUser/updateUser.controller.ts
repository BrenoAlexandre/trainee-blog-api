import * as Express from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Controller, Put, Request, Route, SuccessResponse } from 'tsoa';
import { injectable } from 'tsyringe';
import { IUpdateInput } from './interfaces';
import { UpdateUserUseCase } from './updateUserUseCase';

@injectable()
@Route('users')
export class UpdateUserController extends Controller {
  constructor(private updateUserUseCase: UpdateUserUseCase) {
    super();
  }

  @SuccessResponse(StatusCodes.CONTINUE, ReasonPhrases.CONTINUE)
  @Put()
  public async handler(@Request() request: Express.Request) {
    const { user, name } = request.body;

    const data: IUpdateInput = { name, user };
    await this.updateUserUseCase.execute(data);

    this.setStatus(StatusCodes.CONTINUE);
  }
}
