import { ICustomErrorObject } from '../interfaces';

const httpCodes = {
  badRequest: 400,
  authorization: 401,
  forbidden: 403,
  notFound: 404,
  unprocessable: 422,
};

export class CustomError extends Error {
  customObject?: any;

  code: number;

  constructor(message: string | undefined, customObject?: ICustomErrorObject) {
    super(message);
    this.customObject = customObject;
    this.code = httpCodes.badRequest;
  }

  static badRequest(
    message: string | undefined,
    customObject?: ICustomErrorObject
  ) {
    const newError = new CustomError(message, customObject);
    newError.code = httpCodes.badRequest;
    return newError;
  }

  static authorization(
    message: string | undefined,
    customObject?: ICustomErrorObject
  ) {
    const newError = new CustomError(message, customObject);
    newError.code = httpCodes.authorization;
    return newError;
  }

  static forbidden(
    message: string | undefined,
    customObject?: ICustomErrorObject
  ) {
    const newError = new CustomError(message, customObject);
    newError.code = httpCodes.forbidden;
    return newError;
  }

  static notFound(
    message: string | undefined,
    customObject?: ICustomErrorObject
  ) {
    const newError = new CustomError(message, customObject);
    newError.code = httpCodes.notFound;
    return newError;
  }

  static unprocessable(
    message: string | undefined,
    customObject?: ICustomErrorObject
  ) {
    const newError = new CustomError(message, customObject);
    newError.code = httpCodes.unprocessable;
    return newError;
  }
}
