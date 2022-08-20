import { Box, Button, Center, Image, SimpleGrid } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export const AuthPage = () => {
  return (
    <SimpleGrid
      sx={() => ({
        height: '100vh',
      })}
      cols={2}
      spacing={0}
    >
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <Image width={500} src="/logo.svg"></Image>
      </Box>
      <Center
        sx={() => ({
          height: '100%',
        })}
      >
        <Button>Sign In</Button>
      </Center>
    </SimpleGrid>
  );
};

export default AuthPage;
