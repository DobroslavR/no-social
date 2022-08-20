import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '@shared';
import { UsersService } from '@backend/feature/users';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    const user = await this.usersService.findById(userId);
    done(null, user);
  }
}
