import { AuthenticationController } from './authentication.controller';
import { Module } from '@nestjs/common';
import { LocalSerializer } from './serializers/local.serializer';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationPasswordService } from './services/authentication-password.service';
import { AuthenticationEmailService } from './services/authentication-email.service';
import { AuthenticationForgotPasswordService } from './services/authentication-forgot-password.service';
import { AuthenticationService } from './services/authentication.service';
import { UsersModule } from '@backend/feature/users';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule, PassportModule.register({ session: true })],
  controllers: [AuthenticationController],
  providers: [
    // Services
    AuthenticationService,
    AuthenticationEmailService,
    AuthenticationPasswordService,
    AuthenticationForgotPasswordService,
    // Session serializer
    LocalSerializer,
    // Authentication strategies
    LocalStrategy,
  ],
  exports: [PassportModule],
})
export class AuthenticationModule {}
