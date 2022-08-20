import { Box } from '@mantine/core';
import { ReactNode } from 'react';

export const PageCenteredContent = ({ children, width = 1200 }: { children: ReactNode; width?: number }) => {
  return (
    <Box
      sx={{
        margin: '0 auto',
        maxWidth: width,
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
};
