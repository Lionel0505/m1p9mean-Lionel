import {plainToClass} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { HttpException } from "../utils/api-models/http.exception";


export const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {

  return (req: Request, res: Response, next: NextFunction) => {

    // @ts-ignore
    validate(plainToClass(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted
    }).then((errors: ValidationError[]) => {

      if (errors.length > 0) {

        console.error('-------------------- Request body error --------------------\n', errors, '\n\'-------------------- Request body error --------------------\'');

        const message = errors.map((error: ValidationError) => Object.values(error.constraints!)).join(', ');
        next(new HttpException(400, message));

      } else {

        next();

      }

    });

  };
};
