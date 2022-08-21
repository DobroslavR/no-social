import { Group, GroupProps, Title } from '@mantine/core';
import { ReactNode, RefAttributes } from 'react';

type DefaultGroupProps = GroupProps & RefAttributes<HTMLDivElement>;

export interface PageHeadProps extends DefaultGroupProps {
  title: string;
  rightSection?: ReactNode;
}

export const PageHead = ({ title, rightSection, ...props }: PageHeadProps) => {
  return (
    <Group position="apart" mb="md" {...props}>
      <Title size="md">{title}</Title>
      {rightSection}
    </Group>
  );
};
