import { useMutation } from '@tanstack/react-query';
import { confirmEmail } from '../api';

import { ConfirmEmailDto } from '@shared';

export const useConfirmEmail = () => {
  return useMutation((confirmEmailDto: ConfirmEmailDto) => {
    return confirmEmail(confirmEmailDto);
  });
};
