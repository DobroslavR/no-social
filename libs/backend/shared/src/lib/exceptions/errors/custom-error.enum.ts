export enum Exception {
  // Emails
  EMAIL_ALREADY_CONFIRMED = 'email_already_confirmed',
  BAD_EMAIL_CONFIRMATION_PAYLOAD = 'bad_email_confirmation_payload',
  EMAIL_CONFIRMATION_LINK_EXPIRED = 'email_confirmation_link_expired',
  FAILED_TO_SEND_VERIFICATION_EMAIL = 'failed_to_send_verification_email',
  // Passwords
  BAD_PASSWORD_RESET_PAYLOAD = 'bad_password_reset_payload',
  PASSWORD_RESET_LINK_EXPIRED = 'password_reset_link_expired',
  BAD_OLD_PASSWORD = 'bad_old_password',
  // Users
  USER_ALREADY_EXISTS = 'user_already_exists',
  USER_NOT_FOUND = 'user_not_found',
  // Posts
  POST_NOT_FOUND = 'post_not_found',
  INVALID_POST_SCHEDULED_AT_DATE = 'invalid_post_scheduled_at_date',
  POST_ALREADY_SCHEDULED = 'post_already_scheduled',
  POST_ALREADY_PUBLISHED = 'post_already_published',
  POST_NOT_SCHEDULED = 'post_not_scheduled',
  // Search Engine
  NOT_ALLOWED_SEARCH_FILTERS = 'NOT_ALLOWED_SEARCH_FILTERS',
  NOT_ALLOWED_SEARCH_SORT = 'NOT_ALLOWED_SEARCH_SORT',
  // Followe
  USER_ID_SAME_AS_SECOND_USER_ID = 'USER_ID_SAME_AS_SECOND_USER_ID',
}
