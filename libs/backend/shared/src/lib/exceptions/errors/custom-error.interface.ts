import { Exception } from './custom-error.enum';

export interface CustomError {
  code?: Exception;
  message: string;
}
