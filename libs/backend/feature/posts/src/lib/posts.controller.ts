import { Body, Controller, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser, CookieAuthenticationGuard, UserId } from '@backend/shared';
import {
  CreatePostDraftDto,
  Post as PostEntity,
  PublishPostDraftDto,
  PublishPostDto,
  SchedulePostDto,
  SearchRequestDto,
  User,
} from '@shared';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('Posts')
@UseGuards(CookieAuthenticationGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/search')
  @HttpCode(200)
  async searchPosts(@Body() searchRequestDto: SearchRequestDto<PostEntity>, @UserId() userId: string) {
    return this.postsService.searchPosts(userId, searchRequestDto);
  }

  @Get('/:postId')
  async findPostById(@UserId() userId: string, @Param('postId') postId: string) {
    return this.postsService.findPostByIdWithErrorValidation({
      postId,
      userId,
    });
  }

  @Post('draft')
  async createPostDraft(@UserId() userId: string, @Body() createPostDraftDto: CreatePostDraftDto) {
    return this.postsService.createPostDraft(userId, createPostDraftDto);
  }

  @Post('publish')
  async publishPost(@UserId() userId: string, @Body() publishPostNowDto: PublishPostDto) {
    return this.postsService.publishPost(userId, publishPostNowDto);
  }

  @Patch('draft/publish')
  async publishPostDraft(@UserId() userId: string, @Body() publishPostDto: PublishPostDraftDto) {
    return this.postsService.publishPostDraft(userId, publishPostDto);
  }

  @Patch('schedule')
  async schedulePost(@UserId() userId: string, @Body() schedulePostDto: SchedulePostDto) {
    return this.postsService.schedulePost(userId, schedulePostDto);
  }

  @Patch('unschedule/:postId')
  async unschedulePost(@UserId() userId: string, @Param('postId') postId: string) {
    return this.postsService.unschedulePost(userId, postId);
  }
}
