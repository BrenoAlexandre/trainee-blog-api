import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import {
  Body,
  Controller,
  OperationId,
  Put,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { injectable } from 'tsyringe';
import { IAuthRequest } from '../../../interfaces';
import { IUpdateInput } from './interfaces';
import { UpdateUserUseCase } from './updateUserUseCase';
import { UpdateUserRequestDTO } from './UpdateUserRequestDTO';
import { INotFound } from '../../../interfaces/httpStatus';

@injectable()
@Route('user')
export class UpdateUserController extends Controller {
  constructor(private updateUserUseCase: UpdateUserUseCase) {
    super();
  }

  /**
   * Edita o nome do usuário autenticado.
   * @summary Edita o nome do usuário
   */
  @Tags('users')
  @SuccessResponse(StatusCodes.NO_CONTENT, ReasonPhrases.NO_CONTENT)
  @Response<INotFound>(404, 'Not Found', {
    message: 'USER_NOT_FOUND',
    error: ['User not found'],
  })
  @Security('bearer')
  @Put()
  @OperationId('UpdateUser')
  public async handler(
    @Body() request: UpdateUserRequestDTO,
    @Request() req: IAuthRequest
  ) {
    const { name } = request;
    const { user } = req;

    const data: IUpdateInput = { name, user };
    await this.updateUserUseCase.execute(data);
  }
}
