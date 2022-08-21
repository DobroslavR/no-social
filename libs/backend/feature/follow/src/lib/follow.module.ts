import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [FollowController],
  providers: [FollowService],
  exports: [],
})
export class FollowModule {}
