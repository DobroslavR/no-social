import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PostsService } from './posts.service';

@Processor('posts')
export class PostsProcessor {
  constructor(private postsService: PostsService) {}

  private logger = new Logger('PostsProcessor');

  @Process()
  async schedulePost(job: Job) {
    this.logger.log(`Processing job ${job.id}`);
    const post = job.data;
    console.log(post);
  }
}
