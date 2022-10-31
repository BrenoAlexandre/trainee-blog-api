import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import {
  Body,
  Controller,
  Example,
  OperationId,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { injectable } from 'tsyringe';
import { IUser } from '../../../models/user.model';
import { CreateUserUseCase } from './createUserUseCase';
import { CreateUserRequestDTO } from './CreateUserRequestDTO';
import { CreateUserResponseDTO } from './CreateUserResponseDTO';
import { IUnprocessable } from '../../../interfaces/httpStatus';

@injectable()
@Route('user')
export class CreateUserController extends Controller {
  constructor(private createUserUseCase: CreateUserUseCase) {
    super();
  }

  /**
   * A partir dos dados abaixo, um novo usuário é criado.
   * @summary Cria um novo usuário
   */
  @Tags('users')
  @Example<CreateUserResponseDTO>({
    id: 'd73fd535-ecd2-4886-bcbd-15312a81a71e',
    name: 'John Doe',
    email: 'john@mail.com',
    role: 'user',
  })
  @SuccessResponse(StatusCodes.CREATED, ReasonPhrases.CREATED)
  @Response<IUnprocessable>(422, 'Unprocessable entity', {
    message: 'WRONG_CREDENTIALS',
    error: ['Email already in use', `Password confirmation doesn't match`],
  })
  @Post()
  @OperationId('CreateUser')
  public async handler(
    @Body() requestBody: CreateUserRequestDTO
  ): Promise<IUser> {
    const {
      name,
      email,
      password,
      passwordConfirmation,
      role = 'user',
    } = requestBody;

    const data: CreateUserRequestDTO = {
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
