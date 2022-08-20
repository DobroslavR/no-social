import { useMutation } from '@tanstack/react-query';
import { signUp } from '../api';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { SignUpDto } from '@shared';
import { AxiosError } from 'axios';
import { showNotification } from '@mantine/notifications';
import { AuthenticatedUserState } from '@frontend/users/data-access';
import { AuthRoute } from '@frontend/shared/models';
import { createAbsoluteRoute } from '@frontend/shared/utils';

export const useSignUp = () => {
  const setAuthenticatedUser = useSetRecoilState(AuthenticatedUserState);

  const navigate = useNavigate();

  return useMutation(
    (signUpDto: SignUpDto) => {
      return signUp(signUpDto);
    },
    {
      onSuccess: (user) => {
        setAuthenticatedUser(user);
        navigate(createAbsoluteRoute(AuthRoute.CONFIRM_EMAIL_REQUEST), { replace: true });
      },
      onError: (error: AxiosError) => {
        const errorCode = error.response?.status;
        if (errorCode === 409) {
          showNotification({
            title: 'Oops!',
            message: 'We are really sorry, but this email is already in use',
            color: 'red',
          });
        }
      },
    }
  );
};
