import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateUserInput } from '../schemas/user.schema';

import { createUser } from '../services/user.service';

export async function createUserHandler(
  request: Request<{}, {}, CreateUserInput['body']>,
  response: Response
) {
  const { body } = request;
  const product = await createUser({ ...body });

  response.status(StatusCodes.CREATED).json(product);
}
