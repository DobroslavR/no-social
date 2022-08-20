import { Exception } from './custom-error.enum';
import { CustomError } from './custom-error.interface';

/* const CUSTOM_ERRORS: Record<Exception, CustomError> = {
  // Emails
  [Exception.EMAIL_ALREADY_CONFIRMED]: {
    message: 'This email is already confirmed.',
  },
  [Exception.BAD_EMAIL_CONFIRMATION_PAYLOAD]: {
    message: 'We are sorry, but your confirmation link is invalid.',
  },
  [Exception.EMAIL_CONFIRMATION_LINK_EXPIRED]: {
    message: 'We are sorry, but your confirmation link has expired.',
  },
  // Passwords
  [Exception.BAD_PASSWORD_RESET_PAYLOAD]: {
    message: 'We are sorry, but your password reset link is invalid.',
  },
  [Exception.PASSWORD_RESET_LINK_EXPIRED]: {
    message: 'We are sorry, but your password reset link has expired.',
  },
  [Exception.BAD_OLD_PASSWORD]: {
    message: 'The old password is incorrect.',
  },
  // Users
  [Exception.USER_ALREADY_EXISTS]: {
    message: 'This user already exists.',
  },
  [Exception.USER_NOT_FOUND]: {
    message: 'This user does not exist.',
  },
  [Exception.FAILED_TO_SEND_VERIFICATION_EMAIL]: {
    message:
      'We are sorry, but we failed to send you a verification email. Please try again later.',
  },
  // Posts
  [Exception.POST_NOT_FOUND]: {
    message: 'This post does not exist.',
  },
  [Exception.INVALID_POST_SCHEDULED_AT_DATE]: {
    message: 'The scheduled at date is invalid.',
  },
  [Exception.POST_ALREADY_SCHEDULED]: {
    message: 'This post is already scheduled.',
  },
  [Exception.POST_ALREADY_PUBLISHED]: {
    message: 'This post is already published.',
  },
  [Exception.POST_NOT_SCHEDULED]: {
    message: 'This post is not scheduled.',
  },
}; */

/* export const getCustomError = (code: Exception): CustomError => {
  const { message } = CUSTOM_ERRORS[code];
  return { code, message };
};
 */
