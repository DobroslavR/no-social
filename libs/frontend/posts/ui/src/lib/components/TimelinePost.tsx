import { Avatar, Box, Group, Stack, Text } from '@mantine/core';
import { Post } from '@shared';
import ReactTimeAgo from 'react-time-ago';
import { HighlightedPostText } from './HighlightedPostText';

export const TimelinePost = (post: Post) => {
  const { text, author, published_at } = post;
  return (
    <Box
      p="md"
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.colors.dark[7]}`,
      })}
    >
      <Group noWrap align="flex-start">
        <Avatar color="blue" radius="xl" size="md">
          {author.first_name[0]}
          {author.last_name[0]}
        </Avatar>
        <Stack
          sx={{
            width: '100%',
          }}
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

          <HighlightedPostText text={text} />
        </Stack>
      </Group>
    </Box>
  );
};
