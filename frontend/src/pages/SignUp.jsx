import { Box, Button, Container, FormControl, Heading, Input, FormLabel, Flex, RadioGroup, Stack, Radio, Text, useToast } from '@chakra-ui/react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react'
import { auth, db } from '../config';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [userType, setUserType] = useState('auditor')

  const navigate = useNavigate()
  const toast = useToast()

  const register = async (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, emailId, password)
      .then(async (userAuth) => {
          updateProfile(auth.currentUser, {
              displayName: name,
          })
          const dbRef = collection(db, "users");
          const data = {
            name,
            emailId,
            isWalletVerified: false,
            role: userType
          }
          await addDoc(dbRef, data)
          console.log("name", userAuth);
          toast({
            title: 'Account is created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })  
          navigate('/sign-in')
          
      }).catch((err) => {
        toast({
          title: 'Error occured.',
          description: "Something Went Wrong.",
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
        console.log(err)
      });
  }

  return (
    <Container maxW="1200px" margin="auto" display="flex" justifyContent="center" >
        <Box borderRadius="5px" w="40%" mt="3rem" background="#191925" p="2rem 1rem" shadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">

            <Heading as="h2" mb="2rem" color="#ffffff" fontSize="24px" textAlign="center">
              SIGN UP
            </Heading>

            <FormControl as="form" 
              isRequired color="#ffffff" 
              p={2} 
              onSubmit={register}
              display="flex"
              flexDir="column"
              alignItems="center"
            >
                <Flex w="100%" gap="20px" mb="10px">
                  <Text>Sign Up As :</Text>
                  <RadioGroup onChange={(val) => setUserType(val)} value={userType}>
                    <Stack direction='row'>
                      <Radio value={'auditor'}>An Auditor</Radio>
                      <Radio value={'company'}>A Company</Radio>
                    </Stack>
                  </RadioGroup>
                </Flex>
                <FormLabel w="100%" pl="6px">Name :</FormLabel>
                <Input 
                  name="name" 
                  onChange={(e) => setName(e.target.value)} 
                  borderColor="brand.yellow" 
                  focusBorderColor="brand.yellow" 
                  placeholder='Enter name'
                  value={name}
                  mb="10px" />
                <FormLabel w="100%" pl="6px">Email :</FormLabel>
                <Input 
                  name="email" 
                  borderColor="brand.yellow" 
                  onChange={(e) => setEmailId(e.target.value)} 
                  focusBorderColor="brand.yellow" 
                  placeholder='Enter your email id'
                  type="email" 
                  value={emailId}
                  mb="10px" />
                <FormLabel w="100%" pl="6px">Password :</FormLabel>
                <Input 
                  name="password" 
                  borderColor="brand.yellow"
                  onChange={(e) => setPassword(e.target.value)} 
                  focusBorderColor="brand.yellow" 
                  placeholder='Enter password' 
                  type="password" 
                  value={password}/>
                <Button type="submit" mt="2rem" background="brand.yellow" variant="none" color="#222230">Sign Up</Button>

            </FormControl>
        </Box>
    </Container>
  )
}

export default SignUp