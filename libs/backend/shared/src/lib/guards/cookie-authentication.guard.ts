import { ExecutionContext, Injectable, CanActivate, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class CookieAuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const isAuthenticated = context.switchToHttp().getRequest().isAuthenticated();
    if (!isAuthenticated) {
      throw new UnauthorizedException();
    }
    return isAuthenticated;
  }
}
