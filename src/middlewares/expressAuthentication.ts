import { Request } from 'express';
import { get } from 'lodash';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { CustomError } from '../utils/customError.util';

export const expressAuthentication = async (
  request: Request,
  securityName: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scopes?: string[]
  // eslint-disable-next-line consistent-return
): Promise<void> => {
  if (securityName === 'bearer') {
    const token = get(request, 'headers.authorization', '').replace(
      /^Bearer\s/,
      ''
    );

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(CustomError.authorization('No token provided'));
      }

      jwt.verify(token, config.jwtSecret, (err: any, decoded: any) => {
        if (err) {
          reject(CustomError.authorization('Provided token has expired'));
        } else {
          resolve(decoded);
        }
      });
    });
  }
};
