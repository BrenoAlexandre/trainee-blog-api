import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateUserInput } from '../../schemas/user.schema';

import { createUser } from '../../services/user.service';

export async function createUserHandler(
  request: Request<{}, {}, CreateUserInput['body']>,
  response: Response
) {
  const { body } = request;
  const {
    name,
    email,
    password,
    passwordConfirmation = '',
    role = 'user',
  } = body;
  const data = { name, email, password, passwordConfirmation, role };
  const product = await createUser(data);

  response.status(StatusCodes.CREATED).json(product);
}
