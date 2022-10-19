import * as Express from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Post, Request, Route, SuccessResponse } from 'tsoa';
import { injectable } from 'tsyringe';
import { CreateUserUseCase } from './createUserUseCase';
import { ICreateUserInput } from './interface';

@injectable()
@Route('users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @SuccessResponse(StatusCodes.CREATED, ReasonPhrases.CREATED)
  @Post()
  public async handler(@Request() request: Express.Request) {
    const { name, email, password, passwordConfirmation, role } = request.body;

    const data: ICreateUserInput = {
      name,
      email,
      password,
      passwordConfirmation,
      role,
    };

    const user = await this.createUserUseCase.execute(data);
    return user;
  }
}
