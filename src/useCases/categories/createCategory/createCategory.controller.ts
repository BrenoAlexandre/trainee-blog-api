import { injectable } from 'tsyringe';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import {
  Body,
  Controller,
  OperationId,
  Post,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { IAuthRequest } from '../../../interfaces';
import { IUnauthorized } from '../../../interfaces/httpStatus';
import { ICreateCategoryRequestDTO } from './createCategoryRequestDTO';
import { ICreateCategoryResponseDTO } from './createCategoryResponseDTO';
import { CreateCategoryUseCase } from './createCategoryUseCase';
import { ICreateCategoryInput } from './interfaces';

@injectable()
@Route('category')
export class CreateCategoryController extends Controller {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {
    super();
  }

  /**
   *  Cria uma nova categoria a partir do título enviado.
   *  @summary Criar uma nova categoria
   */
  @Tags('categories')
  @SuccessResponse(StatusCodes.CREATED, ReasonPhrases.CREATED)
  @Response<IUnauthorized>(401, 'Unauthorized', {
    message: 'You dont have permission to create a category',
    error: [],
  })
  @Security('bearer')
  @Post()
  @OperationId('CreateCategory')
  public async handler(
    @Body() request: ICreateCategoryRequestDTO,
    @Request() req: IAuthRequest
  ) {
    const { title } = request;
    const { user } = req;

    const data: ICreateCategoryInput = { title, user };

    const category: ICreateCategoryResponseDTO =
      await this.createCategoryUseCase.execute(data);

    return category;
  }
}
