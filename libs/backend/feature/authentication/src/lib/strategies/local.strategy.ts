import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationPasswordService } from '../services/authentication-password.service';
import { User } from '@no-social/shared';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authenticationPasswordService: AuthenticationPasswordService
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  async validate(email: string, password: string): Promise<User> {
    const user = await this.authenticationPasswordService.validateUserPassword({
      email,
      password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
