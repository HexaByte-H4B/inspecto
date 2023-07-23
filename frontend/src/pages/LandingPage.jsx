import { Box, Heading, Text, Button, Link } from "@chakra-ui/react";

export default function Anime() {
  return (
      <Box position="relative" h="calc(100vh - 3rem)">
          <Box className="anime-container " >
              <div class="ball"></div>
              <div class="shadow"></div>
          </Box>
          <Box position="absolute" top="0" width="100%"  height="100%" background="rgba(0,0,0,0.6)" display="flex" justifyContent="center">
              <Box w="60%" lm="auto" textAlign="center" pt="5rem" >
                  <Heading as="h1" color="#ffffff"   fontSize="2.5rem">
                      Secure Your <span>Protocol</span> With Our Top Rated Auditors
                  </Heading>
                  <Text color='#ffffff' mt="2rem" p="0 1rem" fontSize="20px" letterSpacing="1px" mb="4rem">
                      A p2p decentralized on-chain solution for securing smart contracts. No more hetfy fees, just pay as you want. Auditors get paid for their work and companies get their smart contracts audited.
                  </Text>
                  <Box>
                    <Link to="/sign-up">
                        <Button mr="1rem" > Sign Up  </Button>
                    </Link>
                    <Link to="/sign-up">
                        <Button  to="/sign-in">Sign In </Button> 
                    </Link>
                  </Box>
              </Box>
          </Box>
      </Box>
  )
};