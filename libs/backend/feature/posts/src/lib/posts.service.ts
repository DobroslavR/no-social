import { EntityRepository, MikroORM } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CustomErrorCode } from '@no-social/backend/shared';
import {
  CreatePostDraftDto,
  Post,
  PostState,
  PublishPostDto,
  SchedulePostDto,
} from '@no-social/shared';
import { Queue } from 'bull';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: EntityRepository<Post>,
    private readonly orm: MikroORM,
    @InjectQueue('posts') private postsQueue: Queue
  ) {}

  private logger = new Logger('PostsService');

  async createPostDraft(
    userId: string,
    createPostDraftDto: CreatePostDraftDto
  ) {
    this.logger.log(`Creating post draft for user ${userId}`);

    const { text } = createPostDraftDto;

    const post = this.postsRepository.create({
      text,
      author: userId,
      state: PostState.DRAFT,
    });

    await this.postsRepository.persistAndFlush(post);

    this.logger.log(`Created post draft for user ${userId}`);

    return post;
  }

  async findPostByIdWithErrorValidation({
    postId,
    userId,
  }: {
    userId: string;
    postId: string;
  }) {
    this.logger.log(`Finding post ${postId} for user ${userId}`);

    const post = await this.postsRepository.findOne({
      id: postId,
      author: {
        id: userId,
      },
    });

    if (!post) {
      throw new NotFoundException(CustomErrorCode.POST_NOT_FOUND);
    }

    return post;
  }

  async publishPost(userId: string, publishPostDto: PublishPostDto) {
    const { postId } = publishPostDto;

    this.logger.log(`Publishing post for user ${userId} with id ${postId}`);

    const post = await this.findPostByIdWithErrorValidation({ userId, postId });

    if (post.state === PostState.PUBLISHED) {
      throw new BadRequestException(CustomErrorCode.POST_ALREADY_PUBLISHED);
    }

    post.state = PostState.PUBLISHED;
    post.published_at = new Date();

    await this.postsRepository.persistAndFlush(post);

    this.logger.log(`Published post for user ${userId} with id ${postId}`);

    return post;
  }

  async unschedulePost(userId: string, postId: string) {
    this.logger.log(`Unscheduling post for user ${userId} with id ${postId}`);

    const post = await this.findPostByIdWithErrorValidation({ userId, postId });

    if (post.state !== PostState.SCHEDULED) {
      throw new BadRequestException(CustomErrorCode.POST_NOT_SCHEDULED);
    }

    post.state = PostState.DRAFT;
    post.scheduled_at = null;

    await this.postsRepository.persistAndFlush(post);

    this.logger.log(`Unscheduled post for user ${userId} with id ${postId}`);

    return post;
  }

  async schedulePost(userId: string, schedulePostDto: SchedulePostDto) {
    const { postId, scheduled_at } = schedulePostDto;

    this.logger.log(`Scheduling post for user ${userId} with id ${postId}`);

    const delay = new Date(scheduled_at).getTime() - Date.now();

    const isValidDelay = delay > 0;

    if (!isValidDelay) {
      throw new BadRequestException(
        CustomErrorCode.INVALID_POST_SCHEDULED_AT_DATE
      );
    }

    const post = await this.findPostByIdWithErrorValidation({ userId, postId });

    if (post.state === PostState.PUBLISHED) {
      throw new BadRequestException(CustomErrorCode.POST_ALREADY_PUBLISHED);
    }

    if (post.state === PostState.SCHEDULED) {
      throw new BadRequestException(CustomErrorCode.POST_ALREADY_SCHEDULED);
    }

    post.state = PostState.SCHEDULED;
    post.scheduled_at = new Date(scheduled_at);

    await this.postsRepository.persistAndFlush(post);

    await this.postsQueue.add(post, {
      delay,
    });
  }
}
