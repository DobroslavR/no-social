import {
  Body,
  Controller,
  HttpCode,
  Patch,
  Post,
  Req,
  Session as NestSession,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  SignInWithCredentialsGuard,
  AuthenticatedUser,
  CookieAuthenticationGuard,
} from '@no-social/backend/shared';
import {
  SignUpDto,
  SignInDto,
  User,
  ConfirmEmailDto,
  ForgotPasswordDto,
  ChangeForgottenPasswordDto,
  ChangePasswordDto,
} from '@no-social/shared';
import { Request } from 'express';
import { Session } from 'express-session';
import { AuthenticationEmailService } from './services/authentication-email.service';
import { AuthenticationForgotPasswordService } from './services/authentication-forgot-password.service';
import { AuthenticationPasswordService } from './services/authentication-password.service';
import { AuthenticationService } from './services/authentication.service';

interface SessionWithUser extends Session {
  passport: {
    user: string;
  };
}

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly authenticationEmailService: AuthenticationEmailService,
    private readonly authenticationForgotPasswordService: AuthenticationForgotPasswordService,
    private readonly authenticationPasswordService: AuthenticationPasswordService
  ) {}

  @Post('/sign_up')
  @HttpCode(200)
  async signUp(
    @Body() signUpDto: SignUpDto,
    @NestSession() session: SessionWithUser
  ) {
    const user = await this.authenticationService.signUp(signUpDto);
    session.passport = {
      user: user.id,
    };
    return user;
  }

  @HttpCode(200)
  @UseGuards(SignInWithCredentialsGuard)
  @Post('/sign_in')
  async signIn(@Body() _: SignInDto, @AuthenticatedUser() user: User) {
    return user;
  }

  @Patch('/change_password')
  @UseGuards(CookieAuthenticationGuard)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @AuthenticatedUser() user: User
  ) {
    return await this.authenticationPasswordService.changePassword(
      user,
      changePasswordDto
    );
  }

  @Post('/confirm_email')
  @HttpCode(200)
  confirmEmail(@Body() confirmEmailDto: ConfirmEmailDto) {
    return this.authenticationEmailService.confirmEmail(confirmEmailDto);
  }

  @Post('/forgot_password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authenticationForgotPasswordService.sendForgotPasswordLink(
      forgotPasswordDto
    );
  }

  @Patch('/change_forgotten_password')
  async changeForgottenPassword(
    @Body() changeForgottenPasswordDto: ChangeForgottenPasswordDto
  ) {
    return await this.authenticationForgotPasswordService.changeForgottenPassword(
      changeForgottenPasswordDto
    );
  }

  @Post('/resend_confirmation_link')
  @UseGuards(CookieAuthenticationGuard)
  async resendConfirmationLink(@AuthenticatedUser() user: User) {
    return await this.authenticationEmailService.resendConfirmationLink(user);
  }

  @Post('/log_out')
  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  async logOut(@Req() request: Request) {
    request.logOut({ keepSessionInfo: false }, () => {
      console.log('logged out');
    });

    request.session.cookie.maxAge = 0;
  }
}
