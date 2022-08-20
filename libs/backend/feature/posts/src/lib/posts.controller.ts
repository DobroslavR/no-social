/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthenticatedUser,
  CookieAuthenticationGuard,
  UserId,
} from '@no-social/backend/shared';
import {
  CreatePostDraftDto,
  PublishPostDto,
  SchedulePostDto,
  SearchRequestDto,
  User,
} from '@no-social/shared';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/search')
  @HttpCode(200)
  async searchPosts(
    @Body() searchRequestDto: SearchRequestDto,
    @UserId() userId: string
  ) {
    return this.postsService.searchPosts(userId, searchRequestDto);
  }

  @Get('/:postId')
  @UseGuards(CookieAuthenticationGuard)
  async findPostById(
    @AuthenticatedUser() user: User,
    @Param('postId') postId: string
  ) {
    return this.postsService.findPostByIdWithErrorValidation({
      postId,
      userId: user.id,
    });
  }

  @Post('draft')
  @UseGuards(CookieAuthenticationGuard)
  async createPostDraft(
    @AuthenticatedUser() user: User,
    @Body() createPostDraftDto: CreatePostDraftDto
  ) {
    return this.postsService.createPostDraft(user.id, createPostDraftDto);
  }

  @Patch('publish')
  @UseGuards(CookieAuthenticationGuard)
  async publishPost(
    @AuthenticatedUser() user: User,
    @Body() publishPostDto: PublishPostDto
  ) {
    return this.postsService.publishPost(user.id, publishPostDto);
  }

  @Patch('schedule')
  @UseGuards(CookieAuthenticationGuard)
  async schedulePost(
    @AuthenticatedUser() user: User,
    @Body() schedulePostDto: SchedulePostDto
  ) {
    return this.postsService.schedulePost(user.id, schedulePostDto);
  }

  @Patch('unschedule/:postId')
  @UseGuards(CookieAuthenticationGuard)
  async unschedulePost(
    @AuthenticatedUser() user: User,
    @Param('postId') postId: string
  ) {
    return this.postsService.unschedulePost(user.id, postId);
  }
}
