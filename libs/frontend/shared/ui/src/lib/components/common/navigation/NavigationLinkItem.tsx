import { Box, Group, Loader, NavLink, Stack, Text } from '@mantine/core';
import { useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ActiveRouteMatcherProps, NavigationLink } from './navigation.interface';

export const NavigationLinkItem = ({ children, withPadding }: { children: NavigationLink; withPadding?: boolean }) => {
  const location = useLocation();

  const {
    label,
    route,
    icon: Icon,
    subnavigation,
    rightSection: RightSection,
    rightSectionProps,
    defaultOpened,
    description,
    isSubnavigationLoading,
    subnavigationEmptySection,
    customActiveRouteMatcher,
    activeRouteMatcher,
    disabled,
  } = children;

  const exactActiveRouteMatcher = useCallback(({ location, route }: ActiveRouteMatcherProps) => {
    return location.pathname === route;
  }, []);

  const includesActiveRouteMatcher = useCallback(({ location, route }: ActiveRouteMatcherProps) => {
    return location.pathname.includes(route);
  }, []);

  const startsWithActiveRouteMatcher = useCallback(({ location, route }: ActiveRouteMatcherProps) => {
    return location.pathname.startsWith(`/${route}/`);
  }, []);

  const isRouteActiveMatcher: (props: ActiveRouteMatcherProps) => boolean = useMemo(() => {
    if (customActiveRouteMatcher) {
      return customActiveRouteMatcher;
    } else {
      switch (activeRouteMatcher) {
        case 'exact':
          return exactActiveRouteMatcher;
        case 'includes':
          return includesActiveRouteMatcher;
        case 'startsWith':
          return startsWithActiveRouteMatcher;
        default:
          return subnavigation?.length ? startsWithActiveRouteMatcher : exactActiveRouteMatcher;
      }
    }
  }, [
    activeRouteMatcher,
    customActiveRouteMatcher,
    exactActiveRouteMatcher,
    includesActiveRouteMatcher,
    startsWithActiveRouteMatcher,
    subnavigation,
  ]);

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {RightSection && (
        <Box
          sx={{
            position: 'absolute',
            right: 8,
            top: 9,
            ...rightSectionProps,
          }}
        >
          {RightSection}
        </Box>
      )}
      <NavLink
        disabled={disabled}
        defaultOpened={defaultOpened || (subnavigation?.length && isRouteActiveMatcher({ location, route })) || false}
        description={description}
        label={label}
        icon={Icon && <Icon size={18} />}
        childrenOffset={30}
        // eslint-disable-next-line react/jsx-no-useless-fragment
        rightSection={RightSection && <></>}
        px="sm"
        to={route}
        component={Link}
        sx={(theme) => ({
          borderRadius: theme.radius.md,
          fontWeight: 500,
          '.mantine-NavLink-label': {
            fontSize: 16,
          },
          color: isRouteActiveMatcher({ location, route })
            ? theme.colors[theme.primaryColor][4]
            : theme.colorScheme === 'dark'
            ? theme.colors.gray[4]
            : theme.colors.dark[8],
          backgroundColor: isRouteActiveMatcher({ location, route })
            ? theme.fn.rgba(theme.colors[theme.primaryColor][5], 0.1)
            : 'transparent',
          transition: 'all 0.1s ease-in-out',
          '&:hover': {
            color: theme.colors[theme.primaryColor][4],
            backgroundColor: theme.fn.rgba(theme.colors[theme.primaryColor][5], 0.05),
          },
        })}
      >
        {subnavigation ? (
          <Box pt="xs">
            {!isSubnavigationLoading ? (
              subnavigation.length ? (
                <Stack spacing={6}>
                  {subnavigation.map((subitem) => (
                    <NavigationLinkItem
                      key={subitem.route}
                      children={{ ...subitem, route: `/${route}/${subitem.route}` }}
                    />
                  ))}
                </Stack>
              ) : subnavigationEmptySection ? (
                subnavigationEmptySection
              ) : (
                <Text align="center">No items...</Text>
              )
            ) : (
              <Group position="center" ml={-28}>
                <Loader size="sm" />
              </Group>
            )}
          </Box>
        ) : null}
      </NavLink>
    </Box>
  );
};
