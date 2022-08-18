import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@no-social/shared';

export const UserId = createParamDecorator((_, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();
  return req.user.id;
});
