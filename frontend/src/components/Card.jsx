import {
  Container,
  Box,
  Text,
  Flex,
  Heading,
  Link,
  Button,
  Avatar
} from "@chakra-ui/react";
import { Link as ReactLink } from 'react-router-dom'

const Card = ({
  id,
  title,
  description,
  deposit,
  escrowId,
  blockTimeStamp,
  company,
  url
}) => {
  
  return (
      <>
          <Box mx="auto" mt="2rem"  w="500px" minW="300px" color="#ffffff" background="#191925" shadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;" borderRadius={5} p="2rem 2rem">
              <Flex align="center" m="1rem 0  ">
                  <Avatar mr="1rem" size='sm' name='Avatar' src="" />
                  <Text>{company?.slice(0, 15)}....</Text>
              </Flex>
              <Box>
                  <Heading as="h2" mb="1rem" size="lg">
                      {title}</Heading>
                  <Text mb="1rem">

                      {description}

                  </Text>
                  Reference: <Link href="/" >{url}</Link>

                  <Box display="flex" m="auto" justifyContent="center" width="80%">
                      <Button as={ReactLink} to={`/contract/${id}`} width="100%" type="submit" mt="2rem" background="brand.yellow" variant="none" color="#222230">View Escrow</Button>
                  </Box>
              </Box>
          </Box>
      </>
  )
}

export default Card