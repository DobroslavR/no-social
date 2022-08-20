import { ApiQueryId } from '@frontend/shared/models';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { fetchCurrentUser } from '../api';
import { AuthenticatedUserState } from '../state';

export const useRefetchMe = () => {
  const setUserData = useSetRecoilState(AuthenticatedUserState);

  return useQuery([ApiQueryId.USER_ME], () => fetchCurrentUser(), {
    onSuccess: (data) => setUserData(data),
    enabled: false,
  });
};
