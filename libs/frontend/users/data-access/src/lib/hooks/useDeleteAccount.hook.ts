import { useModals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../api';
import { AuthRoute } from '@no-social/frontend/shared/models';
import { getConfirmDeleteModalProps } from '@no-social/frontend/shared/utils';

export const useDeleteAccount = () => {
  const navigate = useNavigate();

  const mutation = useMutation(
    () => {
      return deleteAccount();
    },
    {
      onSuccess: async () => {
        showNotification({
          color: 'green',
          message: 'You account has been deleted',
        });
        navigate(`/${AuthRoute.SIGN_UP}`);
      },
    }
  );

  const { mutate } = mutation;

  const { openConfirmModal } = useModals();

  const openModal = useCallback(() => {
    return openConfirmModal({
      ...getConfirmDeleteModalProps({
        confirmLabel: 'Delete account',
        text: 'This action is irreversible. You will lose all data related to this account including all projects, their channels and logs.',
      }),

      onConfirm: () => mutate(),
    });
  }, [mutate, openConfirmModal]);

  return { deleteAccount: openModal, mutation };
};
