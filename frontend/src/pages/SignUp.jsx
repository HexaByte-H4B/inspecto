import { Box, Button, Container, FormControl, Heading, Input, FormLabel } from '@chakra-ui/react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react'
import { auth, db } from '../config';

const SignUp = () => {

  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const register = async () => {
    createUserWithEmailAndPassword(auth, emailId, password)
      .then(async (userAuth) => {
          updateProfile(auth.currentUser, {
              displayName: name,
          })
          const dbRef = collection(db, "users");
          const data = {
            name,
            emailId,
            isWalletVerified: false
          }
          await addDoc(dbRef, data)
          console.log("name", userAuth);
          
      }).catch((err) => alert(err));
  }

  return (
    <Container maxW="1200px" margin="auto" display="flex" justifyContent="center" >
        <Box borderRadius="5px" w="40%" mt="3rem" background="#191925" p="2rem 1rem" shadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">

            <Heading as="h2" mb="2rem" color="#ffffff" fontSize="xl">
              SIGN UP
            </Heading>

            <FormControl as="form" isRequired color="#ffffff"  onSubmit={register}>
                <FormLabel>Name :</FormLabel>
                <Input 
                  name="name" 
                  onChange={(e) => setName(e.target.value)} 
                  borderColor="brand.yellow" 
                  focusBorderColor="brand.yellow" 
                  placeholder='First name'
                  value={name} />
                <FormLabel>Email :</FormLabel>
                <Input 
                  name="email" 
                  borderColor="brand.yellow" 
                  onChange={(e) => setEmailId(e.target.id)} 
                  focusBorderColor="brand.yellow" 
                  placeholder='expample@gmail.com'
                  type="emial" 
                  value={emailId}/>
                <FormLabel>Password :</FormLabel>
                <Input 
                  name="password" 
                  borderColor="brand.yellow"
                  onChange={(e) => setPassword(e.target.value)} 
                  focusBorderColor="brand.yellow" 
                  placeholder='enter password' 
                  type="password" 
                  value={password}/>
                <Button type="submit" mt="2rem" background="brand.yellow" variant="none" color="#222230">Sign In</Button>

            </FormControl>
        </Box>
    </Container>
  )
}

export default SignUp