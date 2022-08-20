import { useSearch } from '@frontend/shared/data-access';
import { ApiQueryId } from '@frontend/shared/models';
import { DebouncedSearchInput, PageCenteredContent } from '@frontend/shared/ui';
import { Paper, Stack } from '@mantine/core';
import { Post } from '@shared';
import { useState } from 'react';

export const HomePage = () => {
  const [search, setSearch] = useState('');

  const {
    data,
    query: { isLoading },
  } = useSearch<Post>({
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
  });

  console.log(data);

  return (
    <PageCenteredContent width={1000}>
      <DebouncedSearchInput onChange={(e) => setSearch(e.target.value)} />
      <Stack>
        {data.map((post) => (
          <Paper key={post.id}>{post.text}</Paper>
        ))}
      </Stack>
    </PageCenteredContent>
  );
};
