import * as Express from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Post, Route, SuccessResponse, Request, Controller, Tags } from 'tsoa';
import { injectable } from 'tsyringe';
import { ILoginInput } from './interfaces';
import { LoginUseCase } from './loginUseCase';

@injectable()
@Route('user')
export class LoginController extends Controller {
  constructor(private loginUseCase: LoginUseCase) {
    super();
  }

  @Tags('users')
  @SuccessResponse(StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT)
  @Post('/login')
  public async handler(@Request() request: Express.Request) {
    const { email, password } = request.body;

    const data: ILoginInput = { email, password };

    const { token, refreshToken } = await this.loginUseCase.execute(data);

    this.setHeader('authorization', token);
    this.setHeader('refreshToken', refreshToken);
    this.setStatus(StatusCodes.NO_CONTENT);
  }
}
