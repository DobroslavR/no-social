import { useMutation } from '@tanstack/react-query';
import { logOut } from '../api';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { AuthRoute } from '@frontend/shared/models';
import { createAbsoluteRoute } from '@frontend/shared/utils';

export const useLogOut = () => {
  const navigate = useNavigate();

  return useMutation(() => logOut(), {
    onSettled: async () => {
      navigate(createAbsoluteRoute(AuthRoute.SIGN_IN));

      showNotification({
        title: 'We will miss you!',
        message: 'You have been successfully logged out.',
        color: 'blue',
      });
    },
  });
};
