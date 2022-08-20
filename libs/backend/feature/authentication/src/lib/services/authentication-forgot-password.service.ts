import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ConfigSchema } from '@backend/core/configuration';
import { EmailService } from '@backend/feature/email';
import { UsersService } from '@backend/feature/users';
import { Exception } from '@backend/shared';
import { ForgotPasswordDto, ChangeForgottenPasswordDto } from '@shared';

import { AuthenticationPasswordService } from './authentication-password.service';

interface VerificationTokenPayload {
  email: string;
}

@Injectable()
export class AuthenticationForgotPasswordService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<ConfigSchema>,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly authenticationPasswordService: AuthenticationPasswordService
  ) {}

  private logger = new Logger('AuthenticationForgotPasswordService');

  async sendForgotPasswordLink(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    this.logger.log(`Sending forgot password link to ${email}`);
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_FORGOT_PASSWORD_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_FORGOT_PASSWORD_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
    });

    const url = `${this.configService.get('CLIENT_URL')}/${this.configService.get(
      'FORGOT_PASSWORD_URL'
    )}?token=${token}`;

    const text = `To reset your password, please click here: ${url}`;

    await this.emailService.sendEmail(email, 'Forgot Password', text);

    this.logger.log(`Forgot password link sent to ${email}`);
  }

  async changeForgottenPassword(changeForgottenPasswordDto: ChangeForgottenPasswordDto) {
    const { token, password } = changeForgottenPasswordDto;

    const email = await this.decodeConfirmationToken(token);
    this.logger.log(`Changing password for ${email}`);

    const user = await this.usersService.findByEmail(email);

    const { hashedPassword, salt } = await this.authenticationPasswordService.generateHashedPasswordAndSalt(password);

    await this.usersService.changePassword(user, hashedPassword, salt);

    this.logger.log(`Password has been changed for email ${email}`);
  }

  async decodeConfirmationToken(token: string): Promise<string> {
    this.logger.log(`Decoding confirmation token`);
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_FORGOT_PASSWORD_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email as string;
      }

      throw new BadRequestException(Exception.BAD_PASSWORD_RESET_PAYLOAD);
    } catch (error) {
      const err = error as Error;
      if (err?.name === 'TokenExpiredError') {
        throw new BadRequestException(Exception.PASSWORD_RESET_LINK_EXPIRED);
      }
      throw new BadRequestException(Exception.BAD_PASSWORD_RESET_PAYLOAD);
    }
  }
}
