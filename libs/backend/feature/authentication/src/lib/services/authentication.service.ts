import { DriverException } from '@mikro-orm/core';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UsersService } from '@no-social/backend/feature/users';
import { Exception } from '@no-social/backend/shared';
import { SignUpDto } from '@no-social/shared';

import { AuthenticationEmailService } from './authentication-email.service';
import { AuthenticationPasswordService } from './authentication-password.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authenticationEmailService: AuthenticationEmailService,
    private readonly authenticationPasswordService: AuthenticationPasswordService
  ) {}

  private logger = new Logger('AuthenticationService');

  public async signUp(signUpDto: SignUpDto) {
    const { password, email } = signUpDto;
    this.logger.log(`Signing up user ${email}`);
    try {
      const { hashedPassword, salt } =
        await this.authenticationPasswordService.generateHashedPasswordAndSalt(
          password
        );

      const user = await this.usersService.create({
        ...signUpDto,
        password: hashedPassword,
        salt,
      });

      try {
        await this.authenticationEmailService.sendEmailVerificationLink(email);
      } catch (error) {
        this.logger.error(error);
        throw new ConflictException(
          Exception.FAILED_TO_SEND_VERIFICATION_EMAIL
        );
      }
      return user;
    } catch (e) {
      const error = e as DriverException;
      // TODO: Add proper error handling
      if (error?.code === '23505') {
        this.logger.error(`User ${email} already exists`);
        throw new ConflictException(Exception.USER_ALREADY_EXISTS);
      }

      /*      this.logger.error(`Error signing up user ${email}`); */
      throw new InternalServerErrorException();
    }
  }
}
