import { PostTimeline } from '@frontend/posts/ui';
import { useInfiniteSearch } from '@frontend/shared/data-access';
import { ApiQueryId } from '@frontend/shared/models';
import { InfiniteScrollLoading } from '@frontend/shared/ui';
import { Stack } from '@mantine/core';
import { Post } from '@shared';

export const HomeTimeline = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteSearch<Post>({
    dataSourceEndpoint: 'timeline',
    customEndpointPath: 'home',
    dataSourceId: ApiQueryId.SEARCH_HOME_TIMELINE,
    options: {
      sortBy: { path: 'published_at', direction: 'desc' },
    },
    limit: 20,
  });

  return (
    <Stack>
      <PostTimeline posts={data} />
      <InfiniteScrollLoading fetchNextPage={fetchNextPage} isLoading={isLoading} hasNextPage={!!hasNextPage} />
    </Stack>
  );
};
