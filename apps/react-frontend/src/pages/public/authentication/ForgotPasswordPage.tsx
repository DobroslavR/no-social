import { AuthRoute } from '@frontend/shared/models';
import { Anchor, Button, Center, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ArrowNarrowLeft } from 'tabler-icons-react';

export const ForgotPasswordPage = () => {
  const { register, getValues } = useForm<{ email: string }>();

  const [hasSent, setHasSent] = useState(false);

  const handleForgotPassword = () => {
    const data = getValues();
    console.log(data);
    setHasSent(true);
  };

  return (
    <Center
      sx={() => ({
        height: '100vh',
      })}
    >
      <Stack
        spacing={0}
        sx={() => ({
          width: 450,
        })}
      >
        <Anchor component={Link} to={`/${AuthRoute.SIGN_IN}`} color="primary" weight={500}>
          <Group spacing={6}>
            <Text mt={2} inline color="primary">
              <ArrowNarrowLeft />
            </Text>
            Back to Sign In
          </Group>
        </Anchor>
        {/*        {!hasSent && <ForgotPasswordSendEmail />}
        {hasSent && <ResetPasswordEmailSent />} */}
        <Title>Forgot Password</Title>
        <Text color="dimmed" mb="md">
          Please, enter your email address to receive a link to reset your password
        </Text>
        <TextInput
          {...register('email', { required: true })}
          mb="lg"
          size="md"
          required
          label="Email"
          placeholder="eg. hello@picsnatch.com"
        />
        <Button onClick={handleForgotPassword} size="md" fullWidth>
          {hasSent ? 'Send Again' : 'Send'}
        </Button>
      </Stack>
    </Center>
  );
};

export default ForgotPasswordPage;
