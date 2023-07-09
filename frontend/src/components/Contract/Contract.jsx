



import {
    Container,
    Box,
    Avatar,
    Heading,
    Text,
    Link,
    Spacer,
    useDisclosure,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalCloseButton,
    ModalFooter,
    Button,
    Modal,
} from "@chakra-ui/react";


function Contract() {
  const TruncatedText = ({ text }) => {
    
    const truncated = text.length > 5 ? text.slice(0, 5) + '...' : text;
    
    return <div>{truncated}</div>;

  };
//  ---------modal----------
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ApprovalModal=()=>{
    return (
      <>
        <Button size="sm" onClick={onOpen}>Approval</Button>
        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset='slideInBottom'
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            
            <ModalFooter>
              <Button  colorScheme='blue' mr={3} onClick={onClose}>
                Accept
              </Button>
              <Button colorScheme='blue'>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  return (
    <Container maxW="1200px" m="auto">
      
            <Box as="section" display="flex" justifyContent="space-between" color="#ffffff"  __css={{
          '@media only screen and (max-width: 600px)': {
            flexDirection: 'column',
          },
        }}> 

                <Box h="100%"  p="2rem" w="500px">
                <Box display="flex" alignItems="center" mb="1rem">
                <Avatar mr="1rem" size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                <Text>
                  <TruncatedText text={"Truncatetext"}/>
                </Text>
                </Box>
                <Box>
                  <Heading as="h2" mb="1rem">Text Section</Heading>
                  <Text mb="1rem">
                    Text section will come here
                  </Text>

                  <Link>Link</Link>
                </Box>
                </Box>




                <Box  p="2rem 3rem" background="#2D3748" mt="2rem" borderRadius="5px" w="400px" minW={300}>

                <Box display="flex" alignItems="center" mb="1rem" >
                <Avatar mr="1rem" size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                <Text >
                  <TruncatedText text={"Truncatetext"}/>
                </Text>
                <Spacer/>
                <ApprovalModal/>
                </Box>

                <Box display="flex" alignItems="center" mb="1rem">
                <Avatar mr="1rem" size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                <Text >
                  <TruncatedText text={"Truncatetext"}/>
                </Text>
                <Spacer/>
                <ApprovalModal/>
                </Box>

                <Box display="flex" alignItems="center" mb="1rem">
                <Avatar mr="1rem" size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                <Text >
                  <TruncatedText text={"Truncatetext"}/>
                </Text>
                <Spacer/>
                <ApprovalModal/>
                </Box>

                <Box display="flex" alignItems="center" mb="1rem">
                <Avatar mr="1rem" size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                <Text >
                  <TruncatedText text={"Truncatetext"}/>
                </Text>
                <Spacer/>
                <ApprovalModal/>
                </Box>

                <Box display="flex" alignItems="center" mb="1rem">
                <Avatar mr="1rem" size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                <Text >
                  <TruncatedText text={"Truncatetext"}/>
                </Text>
                <Spacer/>
                <ApprovalModal/>
                </Box>

                <Box display="flex" alignItems="center" mb="1rem">
                <Avatar mr="1rem" size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                <Text >
                  <TruncatedText text={"Truncatetext"}/>
                </Text>
                <Spacer/>
                <ApprovalModal/>
                </Box>
                
                </Box>
            </Box>
    </Container>
  )
}

export default Contract