import { Avatar, Group, Stack, Textarea } from '@mantine/core';

export const PostCompose = () => {
  return (
    <Group sx={{ width: '100%' }} align="flex-start">
      <Avatar color="blue" radius="xl" size="md">
        DR
      </Avatar>
      <Stack>
        <Textarea placeholder="Whats happenning now?" variant="filled" />
      </Stack>
    </Group>
  );
};
