import { PostsService } from '@backend/feature/posts';
import { SearchService } from '@backend/feature/search';
import { Injectable } from '@nestjs/common';
import { Post, PostState, SearchRequestDto } from '@shared';

@Injectable()
export class TimelineService extends SearchService<Post> {
  constructor(private readonly postsService: PostsService) {
    super();
  }

  async searchHomeTimelinePosts(userId: string, searchRequestDto: SearchRequestDto<Post>) {
    return this.search({
      repository: this.postsService.getRepository(),
      searchRequestDto,
      searchFields: ['text'],
      allowedFilters: ['text'],
      allowedSorts: ['created_at', 'published_at', 'scheduled_at', 'reply_count'],
      predefinedFilters: {
        author: {
          followers: {
            $in: [userId],
          },
        },
        state: PostState.PUBLISHED,
      },
      relations: ['author', 'in_reply_to.author'],
    });
  }
}
