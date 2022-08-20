import { useSignUp } from '@frontend/authentication/data-access';
import { PasswordStrength } from '@frontend/authentication/ui';
import { AuthRoute } from '@frontend/shared/models';
import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Divider,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { SignUpDto } from '@shared';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ArrowNarrowLeft } from 'tabler-icons-react';

interface SignUpForm extends SignUpDto {
  agreedToTerms: boolean;
}

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpForm>();

  const { mutate, isLoading } = useSignUp();

  const onSubmit = (data: SignUpForm) => {
    mutate(data);
  };

  const { password } = watch();

  return (
    <>
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
          <Title order={2}>Create a new account</Title>

          <Text color="dimmed" mb={28}>
            Please, enter your credentials to sign up
          </Text>
          {/*
          <GoogleButton>Sign up with Google</GoogleButton>

          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          /> */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <Group grow>
                <TextInput
                  size="md"
                  required
                  label="First name"
                  placeholder="eg. John"
                  {...register('first_name', { required: true })}
                />

                <TextInput
                  size="md"
                  required
                  label="Last name"
                  placeholder="eg. Doe"
                  {...register('last_name', { required: true })}
                />
              </Group>

              <TextInput
                size="md"
                required
                label="Username"
                placeholder="eg. Linus"
                {...register('username', { required: true })}
              />

              <TextInput
                size="md"
                required
                type="email"
                label="Email"
                placeholder="eg. hello@picsnatch.com"
                {...register('email', { required: true })}
              />

              <PasswordInput
                size="md"
                required
                label="Password"
                placeholder="Your password"
                {...register('password', {
                  required: true,
                  pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                })}
              />
            </Stack>

            <PasswordStrength value={password} />

            <Group py="xl" position="apart">
              <Checkbox
                required
                {...register('agreedToTerms', { required: true })}
                label={
                  <Text>
                    By joining, you agree with our{' '}
                    <Anchor
                      component="a"
                      href="https://www.picsnatch.com/tos"
                      target="_blank"
                      color="primary"
                      weight={500}
                    >
                      Terms of Service
                    </Anchor>{' '}
                    and{' '}
                    <Anchor
                      component="a"
                      href="https://www.picsnatch.com/privacy"
                      target="_blank"
                      color="primary"
                      weight={500}
                    >
                      Privacy Policy
                    </Anchor>
                  </Text>
                }
              />
            </Group>

            <Button loading={isLoading} size="md" mb="xl" fullWidth type="submit">
              Sign Up
            </Button>

            <Group spacing="xs" position="center">
              <Text>Already have an account?</Text>

              <Anchor component={Link} to={`/${AuthRoute.SIGN_IN}`} color="primary" weight={500}>
                Sign In
              </Anchor>
            </Group>
          </form>
          {/*           <EmailVerificationLinkSentAfterSignUp /> */}
        </Stack>
      </Center>
    </>
  );
};

export default SignUpPage;
