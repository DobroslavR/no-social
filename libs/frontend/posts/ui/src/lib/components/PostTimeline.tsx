import { Stack } from '@mantine/core';
import { Post } from '@shared';
import { TimelinePostBlock } from './TimelinePostBlock';

export interface PostTimelineProps {
  posts: Post[];
}

export const PostTimeline = ({ posts }: PostTimelineProps) => {
  return (
    <Stack spacing={0}>
      {posts.map((post) => (
        <TimelinePostBlock key={post.id} {...post} />
      ))}
    </Stack>
  );
};
