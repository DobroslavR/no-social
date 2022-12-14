import { MikroORM } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SearchService } from '@backend/feature/search';
import { Exception } from '@backend/shared';
import {
  CreatePostDraftDto,
  Post,
  PostState,
  PublishPostDraftDto,
  PublishPostDto,
  SchedulePostDto,
  SearchRequestDto,
} from '@shared';
import { Queue } from 'bull';

@Injectable()
export class PostsService extends SearchService<Post> {
  constructor(
    @InjectRepository(Post)
    private postsRepository: EntityRepository<Post>,
    private readonly orm: MikroORM,
    @InjectQueue('posts') private postsQueue: Queue
  ) {
    super();
  }

  private logger = new Logger('PostsService');

  getRepository() {
    return this.postsRepository;
  }

  async searchPosts(userId: string, searchRequestDto: SearchRequestDto<Post>) {
    return this.search({
      repository: this.postsRepository,
      searchRequestDto,
      searchFields: ['text'],
      allowedFilters: ['text'],
      allowedSorts: ['created_at', 'published_at', 'scheduled_at', 'reply_count'],
      predefinedFilters: {
        author: userId,
        state: PostState.PUBLISHED,
      },
      relations: ['author', 'in_reply_to.author'],
    });
  }

  async createPostDraft(userId: string, createPostDraftDto: CreatePostDraftDto) {
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

  async replyToPost({
    userId,
    postId,
    publishPostDto,
  }: {
    userId: string;
    postId: string;
    publishPostDto: PublishPostDto;
  }) {
    this.logger.log(`Replying to post for user ${userId} with id ${postId}`);

    const post = await this.findPostByIdWithErrorValidation({ userId, postId });

    const repliedPost = await this.publishPost({ userId, publishPostDto, replyToId: post.id });

    return repliedPost;
  }

  async findPostByIdWithErrorValidation({ postId, userId }: { userId: string; postId: string }) {
    this.logger.log(`Finding post ${postId} for user ${userId}`);

    const post = await this.postsRepository.findOne(
      {
        id: postId,
        author: userId,
      },
      { populate: ['replies', 'author'] }
    );

    if (!post) {
      throw new NotFoundException(Exception.POST_NOT_FOUND);
    }

    return post;
  }

  async publishPostDraft(userId: string, publishPostDto: PublishPostDraftDto) {
    const { postId } = publishPostDto;

    this.logger.log(`Publishing post for user ${userId} with id ${postId}`);

    const post = await this.findPostByIdWithErrorValidation({ userId, postId });

    if (post.state === PostState.PUBLISHED) {
      throw new BadRequestException(Exception.POST_ALREADY_PUBLISHED);
    }

    post.state = PostState.PUBLISHED;
    post.published_at = new Date();

    await this.postsRepository.persistAndFlush(post);

    this.logger.log(`Published post for user ${userId} with id ${postId}`);

    return post;
  }

  async publishPost({
    publishPostDto,
    replyToId,
    userId,
  }: {
    userId: string;
    publishPostDto: PublishPostDto;
    replyToId?: string;
  }) {
    const { text } = publishPostDto;

    this.logger.log(`Publishing postnow for user ${userId}`);

    const post = this.postsRepository.create({
      text,
      author: userId,
      state: PostState.PUBLISHED,
      published_at: new Date(),
      in_reply_to: replyToId ? replyToId : null,
    });

    await this.postsRepository.persistAndFlush(post);

    this.logger.log(`Published post for user ${userId} with id ${post.id}`);

    return post;
  }

  async unschedulePost(userId: string, postId: string) {
    this.logger.log(`Unscheduling post for user ${userId} with id ${postId}`);

    const post = await this.findPostByIdWithErrorValidation({ userId, postId });

    if (post.state !== PostState.SCHEDULED) {
      throw new BadRequestException(Exception.POST_NOT_SCHEDULED);
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
      throw new BadRequestException(Exception.INVALID_POST_SCHEDULED_AT_DATE);
    }

    const post = await this.findPostByIdWithErrorValidation({ userId, postId });

    if (post.state === PostState.PUBLISHED) {
      throw new BadRequestException(Exception.POST_ALREADY_PUBLISHED);
    }

    if (post.state === PostState.SCHEDULED) {
      throw new BadRequestException(Exception.POST_ALREADY_SCHEDULED);
    }

    post.state = PostState.SCHEDULED;
    post.scheduled_at = new Date(scheduled_at);

    await this.postsRepository.persistAndFlush(post);

    await this.postsQueue.add(post, {
      delay,
    });
  }
}
