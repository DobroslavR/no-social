import { api } from '@frontend/shared/data-access';
import { ConfirmEmailDto, SignInDto, SignUpDto, User } from '@shared';

const ENDPOINT = 'authentication';

export const signIn = async (signInDto: SignInDto) => {
  return api.post<User>(`${ENDPOINT}/sign_in`, signInDto).then((res) => res.data);
};

export const signUp = async (signUpDto: SignUpDto) => {
  return api.post<User>(`${ENDPOINT}/sign_up`, signUpDto).then((res) => res.data);
};

export const logOut = async () => {
  return api.post(`${ENDPOINT}/log_out`);
};

export const resendConfirmationEmail = async () => {
  return api.post(`${ENDPOINT}/resend_confirmation_link`);
};

export const confirmEmail = async (confirmEmailDto: ConfirmEmailDto) => {
  return api.post(`${ENDPOINT}/confirm_email`, confirmEmailDto);
};
