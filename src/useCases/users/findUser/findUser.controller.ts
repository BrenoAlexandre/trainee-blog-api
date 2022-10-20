import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Get, Path, Route, SuccessResponse, Tags } from 'tsoa';
import { injectable } from 'tsyringe';
import { UUID } from '../../../interfaces';
import { FindUserUseCase } from './findUserUseCase';

@injectable()
@Route('user')
export class FindUserController {
  constructor(private findUserUseCase: FindUserUseCase) {}

  @Tags('users')
  @SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
  @Get('{userId}')
  public async handler(@Path() userId: UUID) {
    const user = await this.findUserUseCase.execute(userId);
    return user;
  }
}
