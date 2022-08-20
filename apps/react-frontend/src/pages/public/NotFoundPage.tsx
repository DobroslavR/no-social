import { createStyles, Title, Text, Button, Group, Center, Stack } from '@mantine/core';
import { ApplicationRoute } from '@no-social/frontend/shared/models';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export const NotFoundPage = () => {
  const { classes } = useStyles();

  return (
    <Center
      sx={() => ({
        height: '100vh',
      })}
    >
      <Stack spacing={0}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>You have found a secret place.</Title>
        <Text color="dimmed" size="lg" align="center" className={classes.description}>
          Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL.
        </Text>
        <Group position="center">
          <Link to={`/${ApplicationRoute.HOME}`}>
            <Button size="md">Take me back</Button>
          </Link>
        </Group>
      </Stack>
    </Center>
  );
};

export default NotFoundPage;
