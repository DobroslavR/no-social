import { TimelinePost } from '@frontend/posts/ui';
import { useInfiniteSearch, useSearch } from '@frontend/shared/data-access';
import { ApiQueryId } from '@frontend/shared/models';
import { DebouncedSearchInput, InfiniteScrollLoading, PageCenteredContent } from '@frontend/shared/ui';
import { Paper, Stack } from '@mantine/core';
import { Post } from '@shared';
import { useState } from 'react';

export const HomePage = () => {
  const [search, setSearch] = useState('');

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteSearch<Post>({
    dataSourceEndpoint: 'posts',
    dataSourceId: ApiQueryId.SEARCH_POSTS,
    options: {
      q: search,
      sortBy: { path: 'created_at', direction: 'desc' },

      /*       filters: [
        {
          path: 'text',
          value: 'string',
          operator: 'EQUAL',
        },
      ], */
    },
    limit: 5,
  });

  console.log(data);

  return (
    <PageCenteredContent width={1000}>
      {/*     <DebouncedSearchInput onChange={(e) => setSearch(e.target.value)} /> */}
      <Stack spacing={0}>
        {data.map((post) => (
          <TimelinePost key={post.id} {...post} />
        ))}
      </Stack>
      <InfiniteScrollLoading fetchNextPage={fetchNextPage} isLoading={isLoading} hasNextPage={!!hasNextPage} />
    </PageCenteredContent>
  );
};
