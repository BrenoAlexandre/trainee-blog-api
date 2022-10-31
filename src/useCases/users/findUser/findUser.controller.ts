import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import {
  Controller,
  Example,
  Get,
  OperationId,
  Path,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { injectable } from 'tsyringe';
import { UUID } from '../../../interfaces';
import { FindUserUseCase } from './findUserUseCase';
import { FindUserResponseDTO } from './FindUserResponseDTO';
import { INotFound } from '../../../interfaces/httpStatus';

@injectable()
@Route('user')
export class FindUserController extends Controller {
  constructor(private findUserUseCase: FindUserUseCase) {
    super();
  }

  /**
   * Encontra um usuário pelo id indicado.
   * @summary Encontra um usuário
   * @param userId Id do usuário que deseja encontrar
   */
  @Tags('users')
  @Example<FindUserResponseDTO>({
    id: '52907745-7672-470e-a803-a2f8feb52944',
    name: 'John Doe',
    email: 'john@mail.com',
    role: 'user',
  })
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Response<INotFound>(404, 'Not found', {
    message: 'USER_NOT_FOUND',
    error: ['User not found'],
  })
  @Get('{userId}')
  @OperationId('FindUser')
  public async handler(@Path() userId: UUID): Promise<FindUserResponseDTO> {
    const user = await this.findUserUseCase.execute(userId);
    return user;
  }
}
