import { Box, BoxProps } from '@mantine/core';

export interface ResponsiveGridProps extends BoxProps {
  minWidthOfItem: number;
  gap?: number;
  innerSelector?: string;
}

export const ResponsiveGrid = ({ minWidthOfItem, gap, innerSelector, ...props }: ResponsiveGridProps) => {
  return (
    <Box
      sx={(theme) => ({
        [`${innerSelector ? `& ${innerSelector}` : '&'}`]: {
          display: 'grid',
          gap: gap ? gap : theme.spacing.sm,
          gridTemplateColumns: `repeat(auto-fit, minmax(${minWidthOfItem}px, 1fr))`,
        },
      })}
      {...props}
    ></Box>
  );
};
