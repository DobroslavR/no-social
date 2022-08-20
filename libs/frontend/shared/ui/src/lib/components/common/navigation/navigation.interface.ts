import { Sx } from '@mantine/core';
import { ReactNode } from 'react';
import { Icon as TablerIcon } from 'tabler-icons-react';
import { Location } from 'react-router-dom';

export interface ActiveRouteMatcherProps {
  location: Location;
  route: string;
}

export interface NavigationLink {
  route: string;
  label: string;
  tooltip?: string;
  icon?: TablerIcon;
  rightSection?: ReactNode;
  rightSectionProps?: Sx | (Sx | undefined)[];
  subnavigation?: NavigationLink[];
  customActiveRouteMatcher?: (props: ActiveRouteMatcherProps) => boolean;
  activeRouteMatcher?: 'startsWith' | 'exact' | 'includes';
  defaultOpened?: boolean;
  disabled?: boolean;
  description?: string;
  isSubnavigationLoading?: boolean;
  subnavigationEmptySection?: ReactNode;
}
