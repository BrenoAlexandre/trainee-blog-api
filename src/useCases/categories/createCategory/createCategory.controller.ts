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
import { IForbidden } from '../../../interfaces/httpStatus';
import { ICreateCategoryRequestDTO } from './createCategoryRequestDTO';
import { ICreateCategoryResponseDTO } from './createCategoryResponseDTO';
import { CreateCategoryUseCase } from './createCategoryUseCase';
import { ICreateCategory } from '../../../models/category.model';

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
  @Response<IForbidden>(403, 'Forbidden', {
    message: 'FORBIDDEN_OPERATION',
    error: [`You don't  have the permission to create a category`],
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

    const input: ICreateCategory = { title, owner: user.id };

    const category: ICreateCategoryResponseDTO =
      await this.createCategoryUseCase.execute({ input, userRole: user.role });

    return category;
  }
}
