import { Body, Controller, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser, CookieAuthenticationGuard, UserId } from '@backend/shared';
import {
  CreatePostDraftDto,
  Post as PostEntity,
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
  async findPostById(@AuthenticatedUser() user: User, @Param('postId') postId: string) {
    return this.postsService.findPostByIdWithErrorValidation({
      postId,
      userId: user.id,
    });
  }

  @Post('draft')
  async createPostDraft(@AuthenticatedUser() user: User, @Body() createPostDraftDto: CreatePostDraftDto) {
    return this.postsService.createPostDraft(user.id, createPostDraftDto);
  }

  @Patch('publish')
  async publishPost(@AuthenticatedUser() user: User, @Body() publishPostDto: PublishPostDto) {
    return this.postsService.publishPost(user.id, publishPostDto);
  }

  @Patch('schedule')
  async schedulePost(@AuthenticatedUser() user: User, @Body() schedulePostDto: SchedulePostDto) {
    return this.postsService.schedulePost(user.id, schedulePostDto);
  }

  @Patch('unschedule/:postId')
  async unschedulePost(@AuthenticatedUser() user: User, @Param('postId') postId: string) {
    return this.postsService.unschedulePost(user.id, postId);
  }
}
