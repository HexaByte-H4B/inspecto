import React, { useState } from 'react'
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config';
import { useNavigate } from 'react-router-dom';
import { useQueryRunner } from '../utils/useQueryRunner';
import { GetAllEscrowQuery } from '../apollo/Queries';
import { useEffect } from 'react';

const SignIn = () => {

  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const toast = useToast()

  const login = async (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, emailId, password)
      .then((userAuth) => {
          console.log(userAuth.user);
          localStorage.setItem('email', userAuth.user.email)
          navigate("/")
      })
      .catch((err) => {
          if (err.message === "Firebase: Error (auth/wrong-password).") {
            return toast({
              title: 'Invalid Credentials',
              description: "Wrong Password Entered!",
              status: 'error',
              duration: 2000,
              isClosable: true,
            })
          }
          if (err.message === "Firebase: Error (auth/user-not-found).") {
            return toast({
              title: 'Invalid Credentials',
              description: "User Not Found!",
              status: 'error',
              duration: 2000,
              isClosable: true,
            })
          }
          toast({
            title: 'Error occured.',
            description: "Something Went Wrong.",
            status: 'error',
            duration: 2000,
            isClosable: true,
          })
          console.log(err.message)
      });
  }

  const apolloRunner = useQueryRunner()
  const fetcher = async () => {
    const res = await apolloRunner(GetAllEscrowQuery, {})
    console.log(res)
  }

  useEffect(() => {
    fetcher()
  }, [])

  return (
    <Container maxW="1200px" margin="auto" display="flex" justifyContent="center" >
        <Box borderRadius="5px" w="40%" mt="3rem" background="#191925" p="2rem 1rem" shadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">

            <Heading as="h2" mb="2rem" color="#ffffff" fontSize="24px" textAlign="center">
                SIGN IN
            </Heading>

            <FormControl 
              as="form" 
              isRequired 
              color="#ffffff" 
              onSubmit={login}
              display="flex"
              flexDir="column"
              alignItems="center"
              p={2}
            >
                <FormLabel w="100%">Email :</FormLabel>
                <Input 
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  type="email"
                  placeholder='Enter your email'
                  marginBottom={"10px"}
                  focusBorderColor="brand.yellow" 
                  borderColor="brand.yellow"
                />
                <FormLabel w="100%">Password :</FormLabel>
                <Input 
                  name="password" 
                  borderColor="brand.yellow"
                  onChange={(e) => setPassword(e.target.value)} 
                  focusBorderColor="brand.yellow" 
                  placeholder='Enter your password' 
                  type="password" 
                  value={password}/>
                
                <Button type="submit" mt="2rem" background="brand.yellow" variant="none" color="#222230">Sign In</Button>
            </FormControl>
        </Box>
    </Container>
  )
}

export default SignIn