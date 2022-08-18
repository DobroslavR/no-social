import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomErrorCode, getCustomError } from './errors';

export class BadRequestException extends HttpException {
  constructor(code: CustomErrorCode) {
    super(getCustomError(code), HttpStatus.BAD_REQUEST);
  }
}

export class ConflictException extends HttpException {
  constructor(code: CustomErrorCode) {
    super(getCustomError(code), HttpStatus.CONFLICT);
  }
}

export class NotFoundException extends HttpException {
  constructor(code: CustomErrorCode) {
    super(getCustomError(code), HttpStatus.NOT_FOUND);
  }
}
