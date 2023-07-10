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
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAccount } from "wagmi";


function ContractDetails({
  title,
  description,
  url,
  escrowId,
  company,
  appliedAuditors,
  awardedAuditor,
  handleAssignAuditor,
  handleApplyAuditor,
  viewFor
}) {
  const [selectedAuditor, setSelectedAuditor] = useState({})
  const {address, isConnected, isDisconnected} = useAccount()

  const TruncatedText = ({ text }) => {
    
    if (!text) return
    const truncated = text.length > 5 ? text.slice(0, 15) + '...' : text;
    
    return <div>{truncated}</div>;

  };
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ApprovalModal=({escrowId, applicationId})=>{
    return (
      <>
        <Button size="sm" onClick={() => {
          setSelectedAuditor({escrowId, applicationId})
          onOpen()
        }}>Approve</Button>
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
              <Button  colorScheme='blue' mr={3} onClick={async () => {
                try {
                  console.log(selectedAuditor)
                  await handleAssignAuditor(selectedAuditor.escrowId, selectedAuditor.applicationId)
                  onClose()
                } catch(err) {
                  console.log(err)
                }
              }}>
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
        <TruncatedText text={company}/>
      </Text>
      </Box>
      <Box>
        <Heading as="h2" mb="1rem">{title}</Heading>
        <Text mb="1rem">
          {description}
        </Text>

        Reference Link: <Link target="_blank" href={url}> {url}</Link>
      </Box>
      </Box>


      <Box p="2rem" background="#2D3748" mt="2rem" borderRadius="5px" w="400px" minW={300}>
        {awardedAuditor ? (
          <>
            <Text fontSize={20} textAlign="center" marginBottom={"20px"}>Assigned Auditor</Text>
            <Box display="flex" alignItems="center" mb="1rem">
              <Avatar mr="1rem" size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
              <Text >
                <TruncatedText text={awardedAuditor.auditor}/>
              </Text>
            </Box>
            {awardedAuditor.auditor === address && (
              <Button size="sm" onClick={() => handleApplyAuditor(escrowId)}>Mark as completed!</Button>
            )}
          </>
        ) : viewFor === "company" ? 
          (
            <>
              <Text fontSize={20} textAlign="center" marginBottom={"20px"}>Applicants List</Text>
              {appliedAuditors.length ? appliedAuditors?.map((auditor, index) => (
                <Box display="flex" alignItems="center" mb="1rem">
                  <Avatar mr="1rem" size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                  <Text >
                    <TruncatedText text={auditor.auditor}/>
                  </Text>
                  <Spacer/>
                  <ApprovalModal escrowId={auditor.escrowId} applicationId={auditor.applicationId} />
                </Box>
              )) :
                <Text textAlign="center">No Applicants Found</Text>
              }
            </>
          ) : (
            <Flex flexDirection="column" alignItems="center">
              <Text fontSize={20} textAlign="center" marginBottom={"20px"}>Actions</Text>
              <Button onClick={() => handleApplyAuditor(escrowId)}>Apply Now!</Button>
            </Flex>
          )}
      </Box>
    </Box>
  </Container>
)
}

export default ContractDetails