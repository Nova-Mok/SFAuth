import React from 'react';
import axios from 'axios';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

const LoginButton = () => {
  const handleLogin = async () => {
    const clientId = '3MVG9pRzvMkjMb6miYehUkWUQ4OIN6_RQAJ298_ohVitiFua3e0QqoQSoCo4O99G9Kbx8ygiIkwqVYHf1dtJM';
    const redirectUri = 'http://localhost:3000/oauth-callback';
    window.location.href = `https://novastudios.my.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  };

  return (
    <Box position='center' h='100px' display='flex' alignItems='center' justifyContent='center' width='100%'     py={12} mb={2}>
      <Button onClick={handleLogin} size='md' rightIcon={<ArrowForwardIcon />} colorScheme='blue'> Login with Salesforce</Button>
    </Box>

  );
};

export default LoginButton;