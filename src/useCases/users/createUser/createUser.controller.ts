import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Body, Controller, Post, Route, SuccessResponse, Tags } from 'tsoa';
import { injectable } from 'tsyringe';
import { IUser } from '../../../models/user.model';
import { CreateUserUseCase } from './createUserUseCase';
import { RequestDTO } from './RequestDTO';

@injectable()
@Route('user')
export class CreateUserController extends Controller {
  constructor(private createUserUseCase: CreateUserUseCase) {
    super();
  }

  /**
   * A partir dos dados abaixo, um novo usuário é criado.
   * @summary Cria um novo usuário.
   */
  @Tags('users')
  @SuccessResponse(StatusCodes.CREATED, ReasonPhrases.CREATED)
  @Post()
  public async handler(@Body() requestBody: RequestDTO): Promise<IUser> {
    const {
      name,
      email,
      password,
      passwordConfirmation,
      role = 'user',
    } = requestBody;

    const data: RequestDTO = {
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
