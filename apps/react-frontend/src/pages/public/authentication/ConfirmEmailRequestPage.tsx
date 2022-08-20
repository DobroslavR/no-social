import { ApplicationRoute } from '@frontend/shared/models';
import { createAbsoluteRoute } from '@frontend/shared/utils';
import { Anchor, Button, Center, Group, Stack, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ArrowBarToRight } from 'tabler-icons-react';

export const ConfirmEmailRequestPage = () => {
  return (
    <Center
      sx={() => ({
        height: '100vh',
      })}
    >
      <Stack
        spacing={0}
        sx={() => ({
          width: 600,
        })}
      >
        <Title>Check your email</Title>
        <Text color="dimmed" mt="xs" mb="md">
          Please, click on the verification link in the email to complete your registration
        </Text>
        <Text component="span" color="dimmed" mb="md">
          If you have any issues or didn't receive your email, please contact us on {''}
          <Anchor component="a" href="mailto:hello@nosocial.space" color="primary" weight={500}>
            hello@nosocial.space
          </Anchor>{' '}
          or on{' '}
          <Anchor component="a" href="https://twitter.com/dobroslav_dev" color="primary" weight={500}>
            Twitter
          </Anchor>
          .
        </Text>

        <Group grow>
          <Button
            component={Link}
            to={createAbsoluteRoute(ApplicationRoute.HOME)}
            size="md"
            rightIcon={<ArrowBarToRight />}
          >
            Continue to application
          </Button>
        </Group>
      </Stack>
    </Center>
  );
};

export default ConfirmEmailRequestPage;
