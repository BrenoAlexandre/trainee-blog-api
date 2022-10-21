import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import {
  Post,
  Route,
  SuccessResponse,
  Controller,
  Tags,
  Body,
  Response,
} from 'tsoa';
import { injectable } from 'tsyringe';
import { IUnauthorized } from '../../../interfaces/httpStatus';
import { LoginUseCase } from './loginUseCase';
import { LoginRequestDTO } from './LoginRequestDTO';

@injectable()
@Route('user')
export class LoginController extends Controller {
  constructor(private loginUseCase: LoginUseCase) {
    super();
  }

  /**
   *  Recebe seus dados de login e retorna tokens de autenticação (JWT Bearer) no header.
   *  @summary Fazer login na plataforma
   */
  @Tags('users')
  @SuccessResponse(StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT)
  @Response<IUnauthorized>(401, 'Unauthorized', {
    message: 'Incorrect login',
    error: [],
  })
  @Post('/login')
  public async handler(@Body() request: LoginRequestDTO) {
    const { email, password } = request;

    const data = { email, password };
    const { token, refreshToken } = await this.loginUseCase.execute(data);

    this.setHeader('authorization', token);
    this.setHeader('refreshToken', refreshToken);
  }
}
