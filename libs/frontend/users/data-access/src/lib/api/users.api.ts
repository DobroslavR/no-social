import { api } from '@no-social/frontend/shared/data-access';
import { User } from '@no-social/shared';

const ENDPOINT = 'users';

export const fetchCurrentUser = async () => {
  return api.get<User>(`${ENDPOINT}/me`).then((res) => res.data);
};

export const getAccessToken = async () => {
  return api.get<string>(`${ENDPOINT}/me/access_token`).then((res) => res.data);
};

export const deleteAccount = async () => {
  return api.delete(`${ENDPOINT}/me`).then((res) => res.data);
};
