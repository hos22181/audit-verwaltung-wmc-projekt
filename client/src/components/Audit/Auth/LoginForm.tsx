import { Box, Button, ChakraProvider, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { login } from '../../api/auth';
import { Link as ReactRouterLink, Navigate, useNavigate } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'

const LoginForm = () => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    // Perform login logic with email and password
    console.log('Logging in with:', email, password);
    try {
      const res = await login(email, password);
      if (res.token) {
        queryClient.invalidateQueries({ queryKey: ['me'] })
        navigate({ pathname: "/" })
      }
    } catch (error) {
      console.log("Error",)
      toast({
        title: 'Error',
        description: (error as Error)?.message || "There was an error",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  };

  return (
    <ChakraProvider>
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg" w="450px">
          <Heading mb={4}>Login</Heading>
          <form onSubmit={handleLogin}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" value={email} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4} id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" value={password} onChange={handleChange} />
            </FormControl>
            <ChakraLink as={ReactRouterLink} to='/register' mt={8}>
              Register new user
            </ChakraLink>
            <Button
              width="full"
              mt={4}
              colorScheme="blue"
              type="submit"
            >
              Sign in
            </Button>
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default LoginForm;
