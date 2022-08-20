import { Box, Center, Image, SimpleGrid, Stack } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export const AuthenticationPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      <Center>
        <Image width={300} src="/logo.svg" />
      </Center>
      <Outlet></Outlet>
    </Box>
  );
};

export default AuthenticationPage;
