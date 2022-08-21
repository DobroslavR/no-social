import { useFormatNumber } from '@frontend/shared/utils';
import { Group, ActionIcon, Text } from '@mantine/core';
import { Post } from '@shared';
import { Heart, MessageCircle2, Eye } from 'tabler-icons-react';

export const PostStats = (post: Post) => {
  const format = useFormatNumber();

  const { reply_count } = post;

  return (
    <Group>
      <Group spacing={4}>
        <ActionIcon>
          <Heart size={18} />
        </ActionIcon>
        <Text size="sm" inline weight={500}>
          {0}
        </Text>
      </Group>

      <Group spacing={4}>
        <ActionIcon>
          <MessageCircle2 size={18} />
        </ActionIcon>
        <Text size="sm" inline weight={500}>
          {format(reply_count)}
        </Text>
      </Group>

      <Group spacing={4}>
        <ActionIcon>
          <Eye size={18} />
        </ActionIcon>
        <Text size="sm" inline weight={500}>
          {0}
        </Text>
      </Group>
    </Group>
  );
};
