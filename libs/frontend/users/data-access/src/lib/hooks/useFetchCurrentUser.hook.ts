import { ApiQueryId } from '@no-social/frontend/shared/models';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { fetchCurrentUser } from '../api';

import { AuthenticatedUserState } from '../state';

export const useFetchCurrentUser = () => {
  const setAuthenticatedUser = useSetRecoilState(AuthenticatedUserState);

  return useQuery([ApiQueryId.CURRENT_AUTHENTICATED_USER], () => fetchCurrentUser(), {
    onSuccess: (user) => {
      setAuthenticatedUser(user);
    },
    retry: false,
  });
};
