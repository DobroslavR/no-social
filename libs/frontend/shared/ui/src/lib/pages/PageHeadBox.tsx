import { Box, BoxProps } from '@mantine/core';
import { RefAttributes } from 'react';

export const PageHeadBox = ({ children, ...props }: BoxProps & RefAttributes<HTMLDivElement>) => {
  return (
    <Box
      p="md"
      {...props}
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.colors.dark[7]}`,
      })}
    >
      {children}
    </Box>
  );
};
