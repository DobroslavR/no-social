import { showNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { resendConfirmationEmail } from '../api';

export const useResendConfirmationEmail = () => {
  return useMutation(
    () => {
      return resendConfirmationEmail();
    },
    {
      onSuccess: () => {
        showNotification({
          title: 'Done!',
          message: 'We have sent you a new email with a verification link',
          color: 'green',
        });
      },
      onError: () => {
        showNotification({
          title: 'Oops!',
          message: 'We are really sorry, but you need to be signed in to do that',
          color: 'red',
        });
      },
    }
  );
};
