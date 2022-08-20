import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@shared';

export const UserId = createParamDecorator((_, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();
  return req.user.id;
});
