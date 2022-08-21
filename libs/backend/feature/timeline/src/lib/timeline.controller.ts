import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { SearchRequestDto } from '@shared';
import { TimelineService } from './timeline.service';
import { Post as PostEntity } from '@shared';
import { CookieAuthenticationGuard, UserId } from '@backend/shared';
import { ApiTags } from '@nestjs/swagger';

@Controller('timeline')
@ApiTags('Timeline')
@UseGuards(CookieAuthenticationGuard)
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Post('/home')
  @HttpCode(200)
  async searchHomeTimelinePosts(@Body() searchRequestDto: SearchRequestDto<PostEntity>, @UserId() userId: string) {
    return this.timelineService.searchHomeTimelinePosts(userId, searchRequestDto);
  }
}
