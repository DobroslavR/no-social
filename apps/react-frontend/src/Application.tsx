import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  InputProps,
  MantineProvider,
  MantineSize,
  MantineThemeOverride,
  PaginationProps,
  PaperProps,
} from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { NotificationsProvider } from '@mantine/notifications';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const DEFAULT_RADIUS: MantineSize = 'sm';

const MANTINE_THEME_FONT = {
  fontFamily: 'Montserrat, sans-serif',
  headings: { fontFamily: 'Montserrat, sans-serif' },
};

const InputDefaultProps: Partial<InputProps> = {
  radius: DEFAULT_RADIUS,
  variant: 'default',
};

const PaginationDefaultProps: Partial<PaginationProps> = {
  radius: DEFAULT_RADIUS,
};

const SelectDefaultProps: Partial<InputProps> = {};

const PaperDefaultProps: Partial<PaperProps> = {
  withBorder: true,
  p: 'sm',
  shadow: 'sm',
  radius: 'md',
  sx: (theme) => ({
    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
  }),
};

const MANTINE_THEME: MantineThemeOverride = {
  ...MANTINE_THEME_FONT,
  components: {
    Button: {
      defaultProps: {
        radius: DEFAULT_RADIUS,
      },
    },
    Input: {
      defaultProps: InputDefaultProps,
    },
    Paper: {
      defaultProps: PaperDefaultProps,
    },
    Alert: {
      defaultProps: {
        radius: DEFAULT_RADIUS,
      },
    },
    NavLink: {
      defaultProps: {
        radius: DEFAULT_RADIUS,
      },
    },
    Select: {
      defaultProps: SelectDefaultProps,
    },
    MultiSelect: {
      defaultProps: SelectDefaultProps,
    },
    Pagination: {
      defaultProps: PaginationDefaultProps,
    },
  },
};

export function Application({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <QueryClientProvider client={queryClient}>
        {/*         <ReactQueryDevtools initialIsOpen={false} /> */}
        <MantineProvider
          theme={{
            ...MANTINE_THEME,
            colorScheme,
            primaryColor: 'blue',
            cursorType: 'pointer',
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Global
            styles={(theme) => ({
              body: {
                background: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[1],
              },
            })}
          />
          <NotificationsProvider position="top-right">{children}</NotificationsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </ColorSchemeProvider>
  );
}

export default Application;
