import { PageCenteredContent } from '@frontend/shared/ui';
import { Avatar, Box, Group, Paper, Stack, Textarea, Title } from '@mantine/core';
import { ReactNode } from 'react';
import { LayoutNavigation } from './LayoutNavigation';

export const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <PageCenteredContent width={1240}>
      <Box
        sx={(theme) => ({
          display: 'grid',
          gridTemplateColumns: '250px 1fr 350px',
          gap: theme.spacing.md,
        })}
      >
        <LayoutNavigation />
        <Stack
          sx={(theme) => ({
            borderLeft: `1px solid ${theme.colors.dark[7]}`,
            borderRight: `1px solid ${theme.colors.dark[7]}`,
          })}
          spacing={0}
        >
          <Box
            sx={(theme) => ({
              borderBottom: `1px solid ${theme.colors.dark[7]}`,
            })}
            px="md"
            py="sm"
          >
            <Group mb="sm">
              <Title m={0} order={4}>
                Home
              </Title>
            </Group>
            <Group sx={{ width: '100%' }} align="flex-start">
              <Avatar color="blue" radius="xl" size="md">
                DR
              </Avatar>
              <Stack>
                <Textarea placeholder="Whats happenning now?" variant="filled" />
              </Stack>
            </Group>
          </Box>
          <Box>{children}</Box>
        </Stack>
        <Paper
          ml="sm"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
          }}
        >
          Sidebar
        </Paper>
      </Box>
    </PageCenteredContent>
  );
};
