import { Box, Center, Image, SimpleGrid, Stack } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export const AuthenticationPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      <Center>
        <Outlet></Outlet>
      </Center>
    </Box>
  );
};

export default AuthenticationPage;
