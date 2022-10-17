import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { /* Body, Path, */ Post, SuccessResponse } from 'tsoa';
import logger from '../../../config/logger';
import { IUseCase } from '../../../interfaces/IUseCase';

@SuccessResponse(StatusCodes.OK, ReasonPhrases.OK)
@Post('{userId}')
export class FindUserController {
  constructor(private findUserUseCase: IUseCase) {}

  public async handler(
    // @Path() userId: number,
    /* @Body() */
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = request.params;

      const user = await this.findUserUseCase.execute(userId);

      response.status(StatusCodes.OK).json(user);
    } catch (error) {
      logger.error(`findUserHandler :>> ${error}`);
      next(error);
    }
  }
}