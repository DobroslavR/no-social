import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Post, PostComment } from '@no-social/shared';
import { BullModule } from '@nestjs/bull';
import { PostsProcessor } from './posts.processor';

@Module({
  imports: [
    MikroOrmModule.forFeature([Post, PostComment]),
    BullModule.registerQueue({
      name: 'posts',
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsProcessor],
  exports: [],
})
export class PostsModule {}
