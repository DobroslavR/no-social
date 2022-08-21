import { Avatar, Box, Timeline } from '@mantine/core';
import { Post as IPost } from '@shared';
import { Post } from './Post';

export const TimelinePostBlock = (post: IPost) => {
  const { author, in_reply_to } = post;
  return (
    <Box
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.colors.dark[7]}`,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.fn.rgba(theme.colors.dark[9], 0.4),
        },
      })}
    >
      <Timeline m="lg" bulletSize={36} lineWidth={2}>
        {in_reply_to && (
          <Timeline.Item
            bullet={
              <Avatar radius="xl" size="md">
                {in_reply_to.author.first_name[0]}
                {in_reply_to.author.last_name[0]}
              </Avatar>
            }
          >
            <Post {...in_reply_to} />
          </Timeline.Item>
        )}

        <Timeline.Item
          bullet={
            <Avatar radius="xl" size="md">
              {author.first_name[0]}
              {author.last_name[0]}
            </Avatar>
          }
        >
          <Post {...post} />
        </Timeline.Item>
      </Timeline>
    </Box>
  );
};
