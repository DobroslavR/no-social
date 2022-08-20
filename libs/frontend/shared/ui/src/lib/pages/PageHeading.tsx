import { Title, TitleProps } from '@mantine/core';

export type PageHeadingProps = TitleProps & React.RefAttributes<HTMLHeadingElement>;

export const PageHeading = ({ children, ...props }: PageHeadingProps) => {
  return (
    <Title order={3} {...props}>
      {children}
    </Title>
  );
};
