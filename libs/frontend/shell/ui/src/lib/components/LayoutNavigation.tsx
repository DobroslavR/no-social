import { ApplicationRoute } from '@frontend/shared/models';
import { Navigation, NavigationLink } from '@frontend/shared/ui';
import { createAbsoluteRoute } from '@frontend/shared/utils';
import { Box, Image, Navbar, Paper, ScrollArea, Stack } from '@mantine/core';
import { useMemo } from 'react';
import { Home } from 'tabler-icons-react';

export const LayoutNavigation = () => {
  const routes: NavigationLink[] = useMemo(
    (): NavigationLink[] => [
      {
        label: 'Home',
        route: createAbsoluteRoute(ApplicationRoute.HOME),
        icon: Home,
      },
    ],
    []
  );

  return (
    <Box
      p={0}
      sx={(theme) => ({
        height: '100vh',
        background: theme.colorScheme === 'dark' ? '#000' : theme.colors.gray[0],
        position: 'sticky',
        top: 0,
      })}
    >
      <ScrollArea mb="lg">
        <Stack spacing="xs">
          <Navigation items={routes} />
        </Stack>
      </ScrollArea>
    </Box>
  );
};
