import { CustomErrorCode } from './custom-error.enum';

export interface CustomError {
  code?: CustomErrorCode;
  message: string;
}
