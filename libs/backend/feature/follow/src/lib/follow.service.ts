import { SearchService } from '@backend/feature/search';
import { UsersService } from '@backend/feature/users';
import { Exception } from '@backend/shared';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SearchRequestDto, User } from '@shared';

@Injectable()
export class FollowService extends SearchService<User> {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async searchFollowing(userId: string, searchRequestDto: SearchRequestDto<User>) {
    return this.search({
      repository: this.usersService.getRepository(),
      searchRequestDto,
      predefinedFilters: {
        followers: {
          $in: [userId],
        },
      },
    });
  }

  async searchFollowers(userId: string, searchRequestDto: SearchRequestDto<User>) {
    return this.search({
      repository: this.usersService.getRepository(),
      searchRequestDto,
      predefinedFilters: {
        following: {
          $in: [userId],
        },
      },
    });
  }

  async followSomeone({ userId, userToFollowId }: { userId: string; userToFollowId: string }) {
    if (userId === userToFollowId) {
      throw new BadRequestException(Exception.USER_ID_SAME_AS_SECOND_USER_ID);
    }

    const user = await this.usersService.findByIdWithValidation(userId, ['followers', 'following']);

    const userToFollow = await this.usersService.findByIdWithValidation(userToFollowId, ['followers']);

    user.following.add(userToFollow);

    userToFollow.followers.add(user);

    await this.usersService.getRepository().persistAndFlush([user, userToFollow]);
  }

  async unfollowSomeone({ userId, userToUnfollowId }: { userId: string; userToUnfollowId: string }) {
    if (userId === userToUnfollowId) {
      throw new BadRequestException(Exception.USER_ID_SAME_AS_SECOND_USER_ID);
    }

    const user = await this.usersService.findByIdWithValidation(userId, ['followers', 'following']);

    const userToUnfollow = await this.usersService.findByIdWithValidation(userToUnfollowId, ['followers']);

    user.following.remove(userToUnfollow);

    userToUnfollow.followers.remove(userToUnfollow);

    await this.usersService.getRepository().persistAndFlush([user, userToUnfollow]);
  }
}
