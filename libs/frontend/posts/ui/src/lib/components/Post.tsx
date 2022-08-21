import { Group, Stack, Text } from '@mantine/core';
import { Post as IPost } from '@shared';
import ReactTimeAgo from 'react-time-ago';
import { HighlightedPostText } from './HighlightedPostText';
import { PostStats } from './PostStats';

export const Post = (post: IPost) => {
  const { text, author, published_at, reply_count } = post;

  return (
    <Stack
      sx={{
        width: '100%',
      }}
      pl="sm"
      spacing={0}
    >
      <Group position="apart" mb={4}>
        <Group spacing={4}>
          <Text lineClamp={1} size="sm">
            {author.first_name} {author.last_name}
          </Text>
          <Text mt={-2} lineClamp={1} weight={500} color="dimmed" size="sm">
            @{author.username}
          </Text>
        </Group>

        <Text color="dimmed" weight={500} size="sm">
          <ReactTimeAgo date={new Date(published_at as Date)} locale="en-US" timeStyle="twitter" />
        </Text>
      </Group>

      <HighlightedPostText mb="xs" text={text} />

      <PostStats {...post} />
    </Stack>
  );
};
