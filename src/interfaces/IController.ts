import { NextFunction, Request, Response } from 'express';

export interface IController {
  handler(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> | any;
}
