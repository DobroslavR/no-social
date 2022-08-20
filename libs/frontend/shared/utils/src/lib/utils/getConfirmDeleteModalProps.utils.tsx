import { Text } from '@mantine/core';

export interface ConfirmDeleteModalProps {
  title?: string;
  text: string;
  confirmLabel?: string;
}

export const getConfirmDeleteModalProps = ({ text, confirmLabel, title }: ConfirmDeleteModalProps) => {
  return {
    title: title ? title : 'Are you sure?',
    children: <Text size="sm">{text}</Text>,
    confirmProps: { color: 'red' },
    labels: {
      confirm: confirmLabel ? confirmLabel : 'Delete',
      cancel: 'Cancel',
    },
  };
};
