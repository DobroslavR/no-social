import { CustomErrorCode } from './custom-error.enum';
import { CustomError } from './custom-error.interface';

const CUSTOM_ERRORS: Record<CustomErrorCode, CustomError> = {
  // Emails
  [CustomErrorCode.EMAIL_ALREADY_CONFIRMED]: {
    message: 'This email is already confirmed.',
  },
  [CustomErrorCode.BAD_EMAIL_CONFIRMATION_PAYLOAD]: {
    message: 'We are sorry, but your confirmation link is invalid.',
  },
  [CustomErrorCode.EMAIL_CONFIRMATION_LINK_EXPIRED]: {
    message: 'We are sorry, but your confirmation link has expired.',
  },
  // Passwords
  [CustomErrorCode.BAD_PASSWORD_RESET_PAYLOAD]: {
    message: 'We are sorry, but your password reset link is invalid.',
  },
  [CustomErrorCode.PASSWORD_RESET_LINK_EXPIRED]: {
    message: 'We are sorry, but your password reset link has expired.',
  },
  [CustomErrorCode.BAD_OLD_PASSWORD]: {
    message: 'The old password is incorrect.',
  },
  // Users
  [CustomErrorCode.USER_ALREADY_EXISTS]: {
    message: 'This user already exists.',
  },
  [CustomErrorCode.USER_NOT_FOUND]: {
    message: 'This user does not exist.',
  },
  [CustomErrorCode.FAILED_TO_SEND_VERIFICATION_EMAIL]: {
    message:
      'We are sorry, but we failed to send you a verification email. Please try again later.',
  },
  // Posts
  [CustomErrorCode.POST_NOT_FOUND]: {
    message: 'This post does not exist.',
  },
  [CustomErrorCode.INVALID_POST_SCHEDULED_AT_DATE]: {
    message: 'The scheduled at date is invalid.',
  },
  [CustomErrorCode.POST_ALREADY_SCHEDULED]: {
    message: 'This post is already scheduled.',
  },
  [CustomErrorCode.POST_ALREADY_PUBLISHED]: {
    message: 'This post is already published.',
  },
  [CustomErrorCode.POST_NOT_SCHEDULED]: {
    message: 'This post is not scheduled.',
  },
};

export const getCustomError = (code: CustomErrorCode): CustomError => {
  const { message } = CUSTOM_ERRORS[code];
  return { code, message };
};
