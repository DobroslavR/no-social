import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Post } from '@shared';
import { BullModule } from '@nestjs/bull';
import { PostsProcessor } from './posts.processor';

@Module({
  imports: [
    MikroOrmModule.forFeature([Post]),
    BullModule.registerQueue({
      name: 'posts',
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsProcessor],
  exports: [PostsService],
})
export class PostsModule {}
