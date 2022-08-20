import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ConfigSchema } from '@backend/core/configuration';
import { EmailService } from '@backend/feature/email';
import { UsersService } from '@backend/feature/users';
import { Exception } from '@backend/shared';
import { ConfirmEmailDto, User } from '@shared';

interface VerificationTokenPayload {
  email: string;
}

@Injectable()
export class AuthenticationEmailService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService<ConfigSchema>,
    private usersService: UsersService,
    private emailService: EmailService
  ) {}

  private logger = new Logger('AuthenticationEmailService');

  async sendEmailVerificationLink(email: string) {
    this.logger.log(`Sending email verification link to ${email}`);
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_EMAIL_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_EMAIL_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`,
    });

    const url = `${this.configService.get('CLIENT_URL')}/${this.configService.get(
      'EMAIL_CONFIRMATION_URL'
    )}?token=${token}`;

    const text = `Welcome to the application. To confirm the email address, click here: ${url}`;

    await this.emailService.sendEmail(email, 'Email confirmation', text);
    this.logger.log(`Email verification link sent to ${email}`);
  }

  async confirmEmail(confirmEmailDto: ConfirmEmailDto) {
    const email = await this.decodeConfirmationToken(confirmEmailDto.token);
    this.logger.log(`Confirming email ${email}`);
    const user = await this.usersService.findByEmail(email);
    if (user.email_confirmed) {
      throw new BadRequestException(Exception.EMAIL_ALREADY_CONFIRMED);
    }
    await this.usersService.markEmailAsConfirmed(email);
    this.logger.log(`Email ${email} confirmed`);
  }

  async decodeConfirmationToken(token: string): Promise<string> {
    this.logger.log(`Decoding confirmation token`);
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_EMAIL_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email as string;
      } else {
        throw new BadRequestException(Exception.BAD_EMAIL_CONFIRMATION_PAYLOAD);
      }
    } catch (error) {
      const err = error as Error;
      if (err?.name === 'TokenExpiredError') {
        throw new BadRequestException(Exception.EMAIL_CONFIRMATION_LINK_EXPIRED);
      }
      throw new BadRequestException(Exception.BAD_EMAIL_CONFIRMATION_PAYLOAD);
    }
  }

  async resendConfirmationLink(user: User) {
    this.logger.log(`Resending confirmation link to ${user.email}`);
    if (user.email_confirmed) {
      throw new BadRequestException(Exception.EMAIL_ALREADY_CONFIRMED);
    }
    await this.sendEmailVerificationLink(user.email);
    this.logger.log(`Confirmation link sent to ${user.email}`);
  }
}
