import { useMutation } from '@tanstack/react-query';
import { signIn } from '../api';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { SignInDto } from '@shared';
import { showNotification } from '@mantine/notifications';
import { AuthenticatedUserState } from '@frontend/users/data-access';
import { createAbsoluteRoute } from '@frontend/shared/utils';
import { ApplicationRoute } from '@frontend/shared/models';

export const useSignIn = () => {
  const setAuthenticatedUser = useSetRecoilState(AuthenticatedUserState);

  const navigate = useNavigate();

  return useMutation(
    (signInDto: SignInDto) => {
      return signIn(signInDto);
    },
    {
      onSuccess: (user) => {
        setAuthenticatedUser(user);
        navigate(createAbsoluteRoute(ApplicationRoute.HOME));
      },
      onError: () => {
        showNotification({
          title: 'Oops!',
          message: 'Wrong credentials, please try again.',
          color: 'red',
        });
      },
    }
  );
};
