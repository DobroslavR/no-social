import { useFetchCurrentUser } from '@frontend/users/data-access';
import { Center, Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface PrivateLayoutGuardProps {
  redirectUrl: string;
  children: JSX.Element;
}

export const PrivateLayoutGuard = ({ redirectUrl, children }: PrivateLayoutGuardProps) => {
  const { isLoading, isError, isFetching } = useFetchCurrentUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      showNotification({
        title: 'Oops!',
        message: 'Your session has expired. Please sign in again.',
        color: 'red',
      });
      navigate(redirectUrl);
    }
  }, [isLoading, isError, isFetching, navigate, redirectUrl]);

  if (isLoading || isError) {
    return (
      <Center
        sx={() => ({
          height: '100vh',
        })}
      >
        <Loader />
      </Center>
    );
  }

  return children;
};
