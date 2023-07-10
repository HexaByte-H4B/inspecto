

import {
    Box,
    Heading,
    Text,
    Button,
    Link
} from "@chakra-ui/react";

import './anime.css'

const Anime = () => {

    return (

        <Box position="relative" h="calc(100vh - 3rem)">
            <Box className="anime-container " >

                <div class="ball">
                </div>
                <div class="shadow"></div>
            </Box>

            <Box position="absolute" top="0" width="100%"  height="100%" background="rgba(0,0,0,0.5)"
                display="flex" justifyContent="center"
            >

                <Box w="60%" lm="auto" textAlign="center" pt="5rem" >

                    <Heading as="h1" color="#ffffff"   fontSize="2.5rem">
                        Revolutionize the Way You Do <span>Business</span> with Our Smart Contract Platform
                    </Heading>

                    <Text color='#ffffff' mt="2rem" p="0 1rem" fontSize="20px" letterSpacing="1px" mb="4rem">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti praesentium  rerum maiores inventore eligendi magni et at incidunt dolore.
                    </Text>

                    <Box>
                    <Link to="/sign-up">
                    <Button mr="1rem" > SignUp  </Button>
                    </Link>
                    
                    <Link to="/sign-up">
                    <Button  to="/sign-in">SignIn </Button> 
                    </Link>
                   
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default Anime 