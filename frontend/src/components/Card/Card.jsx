

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

const Card = () => {

    
    return (
        <>
            <Container maxW="1200px" m="auto" display="flex">
            <Box  mt="2rem"  w="500px" minW="300px" color="#ffffff" background="#191925" shadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;" borderRadius={5} p="2rem 2rem">
                    <Flex align="center" m="1rem 0  ">
                        <Avatar mr="1rem" size='sm' name='Avatar' src="" />
                        <Text>123e4r5t67ffghg</Text>
                    </Flex>
                    <Box>
                        <Heading as="h2" mb="1rem" size="lg">
                            Describtion section</Heading>
                        <Text mb="1rem">

                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem unknown printer took a galley

                        </Text>
                        <Link href="/" >Github</Link>

                        <Box display="flex" m="auto" justifyContent="center" width="80%">
                            <Button width="100%" type="submit" mt="2rem" background="brand.yellow" variant="none" color="#222230">Button2</Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Card