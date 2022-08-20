import { useConfirmEmail, useResendConfirmationEmail } from '@frontend/authentication/data-access';
import { ApplicationRoute } from '@frontend/shared/models';
import { Anchor, Button, Center, Group, Stack, Text, Title } from '@mantine/core';
import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowBarToRight } from 'tabler-icons-react';

export const EmailVerificationPage = () => {
  const { mutate, isLoading } = useResendConfirmationEmail();

  const { mutate: verifyEmail, isLoading: isVerificationLoading } = useConfirmEmail();

  const [params] = useSearchParams();

  const token = params.get('token');

  useEffect(() => {
    if (token) {
      verifyEmail({ token });
    }
  }, []);

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
        <Title mb="md">Email verified!</Title>
        {/*       <Text component="span" color="dimmed" mb="md">
          If you have any issues or didn't received your email, please click on{' '}
          {''}
          <Text component="span" weight={500} inline color="primary">
            Send Again
          </Text>{' '}
          or contact us on {''}
          <Anchor
            component="a"
            href="mailto:hello@picsnatch.com"
            color="primary"
            weight={500}
          >
            hello@picsnatch.com
          </Anchor>
        </Text> */}

        <Button component={Link} to={`/${ApplicationRoute.HOME}`} size="md" fullWidth rightIcon={<ArrowBarToRight />}>
          Continue to Dashboard
        </Button>
      </Stack>
    </Center>
  );
};

export default EmailVerificationPage;
