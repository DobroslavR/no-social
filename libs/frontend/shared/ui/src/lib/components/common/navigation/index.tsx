import { Stack } from '@mantine/core';
import { NavigationLink } from './navigation.interface';
import { NavigationLinkItem } from './NavigationLinkItem';

export interface NavigationProps {
  items: NavigationLink[];
  noPadding?: boolean;
}

export const Navigation = ({ items, noPadding }: NavigationProps) => {
  return (
    <Stack spacing="xs" px={noPadding ? 0 : 'xs'}>
      {items.map((link, index) => (
        <NavigationLinkItem key={link.route + index} children={link} />
      ))}
    </Stack>
  );
};

export * from './navigation.interface';

export * from './NavigationLinkItem';
