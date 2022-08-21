import { PostsModule } from '@backend/feature/posts';
import { Module } from '@nestjs/common';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';

@Module({
  imports: [PostsModule],
  controllers: [TimelineController],
  providers: [TimelineService],
  exports: [],
})
export class TimelineModule {}
