import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser, CookieAuthenticationGuard } from '@backend/shared';
import { User } from '@shared';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  @Get('/me')
  @UseGuards(CookieAuthenticationGuard)
  @ApiCookieAuth()
  async getMe(@AuthenticatedUser() user: User) {
    return user;
  }
}
