import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SignInWithCredentialsGuard extends AuthGuard('local') {
  override async canActivate(context: ExecutionContext): Promise<boolean> {
    // check the email and the password
    await super.canActivate(context);

    // initialize the session
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);

    // if no exceptions were thrown, allow the access to the route
    return true;
  }
}
