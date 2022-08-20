import { persistAtomLocalStorage } from '@no-social/frontend/shared/data-access';
import { User } from '@no-social/shared';
import { atom } from 'recoil';

export const AuthenticatedUserState = atom<Partial<User> | null>({
  key: 'AuthenticatedUserState',
  default: null,
  effects_UNSTABLE: [persistAtomLocalStorage],
});
