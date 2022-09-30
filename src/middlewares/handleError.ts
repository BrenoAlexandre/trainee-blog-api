/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/customError.util';

export const handleErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    const result = {
      message: err.message || undefined,
      error: err.customObject || undefined,
    };

    return res.status(err.code || 400).send(result);
  }

  return res
    .status(500)
    .send({ error: err.message || 'Internal Server Error' });
};
