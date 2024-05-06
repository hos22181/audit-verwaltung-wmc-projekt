import { ChangeEvent, useState } from 'react';
import { ChakraProvider, Box, FormControl, FormLabel, Input, Button, Heading, useToast, useQuery } from '@chakra-ui/react';
import { login, register } from '../../api/auth';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'

const RegisterForm = () => {
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

  const handleRegister = async (e: any) => {
    e.preventDefault();
    // Perform login logic with email and password
    console.log('Logging in with:', email, password);
    try {
      const res = await register(email, password);

      toast({
        title: 'Success',
        description: res.message || "Successfully created user!",
        status: 'success',
        duration: 9000,
        isClosable: true,
        onCloseComplete: () => {
          navigate({ pathname: "/login", });
        }
      });
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
          <Heading mb={4}>Register</Heading>
          <form onSubmit={handleRegister}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" value={email} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4} id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" value={password} onChange={handleChange} />
            </FormControl>
            <ChakraLink as={ReactRouterLink} to='/login'>
              Already have an account?
            </ChakraLink>
            <Button
              width="full"
              mt={4}
              colorScheme="blue"
              type="submit"
            >
              Register
            </Button>

          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default RegisterForm;
