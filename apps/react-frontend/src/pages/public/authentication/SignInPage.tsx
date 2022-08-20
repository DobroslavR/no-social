import { useSignIn } from '@frontend/authentication/data-access';
import { AuthRoute } from '@frontend/shared/models';
import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Divider,
  Group,
  Image,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { SignInDto } from '@shared';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export const SignInPage = () => {
  const { register, handleSubmit } = useForm<SignInDto>();

  const { mutate, isLoading } = useSignIn();

  const onSubmit = (data: SignInDto) => {
    mutate(data);
  };

  return (
    <Center
      sx={() => ({
        height: '100%',
      })}
    >
      <Stack
        sx={() => ({
          width: 450,
        })}
        spacing={0}
      >
        <Title order={2}>Welcome back</Title>

        <Text color="dimmed" mb={28}>
          Please, enter your credentials to continue
        </Text>

        {/*         <GoogleButton>Sign in with Google</GoogleButton>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />
 */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <TextInput
              size="md"
              required
              label="Email"
              placeholder="eg. hello@picsnatch.com"
              {...register('email', { required: true })}
            />

            <PasswordInput
              size="md"
              required
              label="Password"
              placeholder="Your password"
              {...register('password', { required: true })}
            />
          </Stack>

          <Group py="xl" position="right">
            <Anchor component={Link} to={`/${AuthRoute.FORGOT_PASSWORD}`} color="primary" weight={500}>
              Forgot password
            </Anchor>
          </Group>

          <Button loading={isLoading} size="md" mb="xl" fullWidth type="submit">
            Sign In
          </Button>

          <Group spacing="xs" position="center">
            <Text>Don't have an account?</Text>

            <Anchor component={Link} to={`/${AuthRoute.SIGN_UP}`} color="primary" weight={500}>
              Sign Up
            </Anchor>
          </Group>
        </form>
      </Stack>
    </Center>
  );
};

export default SignInPage;
