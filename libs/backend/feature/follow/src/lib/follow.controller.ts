import { UserId } from '@backend/shared';
import { Body, Controller, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchRequestDto, User } from '@shared';
import { FollowService } from './follow.service';

@Controller('users')
@ApiTags('Follow')
export class FollowController {
  constructor(private followService: FollowService) {}

  @Post('/search/followers')
  @HttpCode(200)
  async searchFollowers(@Body() searchRequestDto: SearchRequestDto<User>, @UserId() userId: string) {
    return this.followService.searchFollowers(userId, searchRequestDto);
  }

  @Post('/search/following')
  @HttpCode(200)
  async searchFollowing(@Body() searchRequestDto: SearchRequestDto<User>, @UserId() userId: string) {
    return this.followService.searchFollowing(userId, searchRequestDto);
  }

  @Patch('follow/:userId')
  async followSomeone(@Param('userId') userToFollowId: string, @UserId() userId: string) {
    return this.followService.followSomeone({ userId, userToFollowId });
  }

  @Patch('unfollow/:userId')
  async unfollowSomeone(@Param('userId') userToUnfollowId: string, @UserId() userId: string) {
    return this.followService.unfollowSomeone({ userId, userToUnfollowId });
  }
}
