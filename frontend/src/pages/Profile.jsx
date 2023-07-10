
import {
  Container,
  Box,
  Avatar,
  Text,
  Image,
  Button,
  Link

} from "@chakra-ui/react";


function Portfolio() {
  return (
    <Container maxW="1200px" m="auto" >
      <Box  m="auto" as="section" w="70%" height="calc(100vh - 3rem)" display="flex" justifyContent="center" alignItems="center">

        <Box h="80%" w="100%" background="#222230" display="flex" flexDirection="column" boxShadow=" rgba(0, 0, 0, 0.24) 0px 3px 8px;" alignItems="center" color="white" padding="2rem">
          <Box textAlign="center">
            <Avatar size='xl' name='Christian Nwamba' src='https://bit.ly/ryan-florence' mb="1rem" boxShadow="rgba(17, 17, 26, 0.1) 0px 0px 16px" />
            <Text fontSize="20px" color='#718096' mb='1rem'>Hexacode</Text>
            <Box display="flex" mb="2rem"> 
              <Box>
              <Link>
              <Image boxSize='70px' m="0 1rem"  alt="achievement" src="./assets/medal1.svg" transition="all 0.8s"
        _hover={{ transform: "scale(1.2)" }}/>
              </Link>
              <Text m="0.5rem 0" fontSize="15px" color="#F7FAFC" letterSpacing={1.3}>Title here</Text>
              
              </Box>
              <Box>
              <Link>
              <Image boxSize='70px' m="0 1rem"  alt="achievement" src="./assets/medal1.svg" 
              transition="all 0.8s"
              _hover={{ transform: "scale(1.2)" }}
              />
              </Link>
              <Text m="0.5rem 0" fontSize="15px" color="#F7FAFC" letterSpacing={1.3}>Title here</Text>
            
              </Box>
              <Box>
              <Link>
              <Image boxSize='70px' m="0 1rem"  alt="achievement" src="./assets/medal1.svg" 
              transition="all 0.8s"
              _hover={{ transform: "scale(1.2)" }}
              />
              </Link>

              <Text m="0.5rem 0" fontSize="15px" color="#F7FAFC" letterSpacing={1.3}>Title here</Text>
              
              </Box>
            </Box>
          <Box  width="100%">
          <Text fontSize="20px" color="#" size='md' mb="1rem"> Title here</Text>
          <Button size='sm' background="#F7FAFC" variant="none" color="#222230">Click to see</Button>
          </Box>


          </Box>
        </Box>

      </Box>
    </Container>
  )
}

export default Portfolio