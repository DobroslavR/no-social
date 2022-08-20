import { Box, MantineTheme } from '@mantine/core';
import { ReactNode } from 'react';

const getStyles = (
  theme: MantineTheme,
  { useXPadding, useYPadding }: { useXPadding?: boolean; useYPadding?: boolean }
) => {
  return {
    padding: `${useYPadding ? theme.spacing.md : 0}px ${useXPadding ? theme.spacing.xl : 0}px`,
    width: '100%',
    height: '100%',
  };
};

export const MainShell = ({
  children,
  useXPadding = true,
  useYPadding = true,
}: {
  children: ReactNode;

  useXPadding?: boolean;
  useYPadding?: boolean;
}) => {
  return <Box sx={(theme) => getStyles(theme, { useXPadding, useYPadding })}>{children}</Box>;
};
