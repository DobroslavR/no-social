import { Text, TextProps } from '@mantine/core';

export type PageDescriptionProps = TextProps & React.RefAttributes<HTMLDivElement>;

export const PageDescription = ({ children, ...props }: PageDescriptionProps) => {
  return (
    <Text color="dimmed" weight={500} size="md" {...props}>
      {children}
    </Text>
  );
};
