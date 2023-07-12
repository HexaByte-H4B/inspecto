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
  latestStatus,
  handleAssignAuditor,
  handleApplyAuditor,
  handleMarkCompleted,
  handleVerifyCompletion,
  viewFor
}) {
  const [selectedAuditor, setSelectedAuditor] = useState({})
  const {address, isConnected, isDisconnected} = useAccount()

  // let assignedAddress = awardedAuditor.auditor
  // let curAddress = address
  // console.log(assignedAddress, curAddress, assignedAddress?.toLowerCase() === curAddress?.toLowerCase())
  // console.log(awardedAuditor)

  console.log({latestStatus})

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
            <ModalHeader>Do you want to assign this auditor for your task?</ModalHeader>
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
                Yes
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


      <Box p="2rem" background="#2D3748" mt="2rem" borderRadius="5px" w="400px" minW={300} pos="relative">
        {awardedAuditor ? (
          <>
            <Text fontSize={20} textAlign="center" marginBottom={"20px"}>Assigned Auditor</Text>
            <Box display="flex" alignItems="center" mb="1rem" pos="res">
              <Avatar mr="1rem" size='sm' name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
              <Text >
                <TruncatedText text={awardedAuditor?.auditor}/>
              </Text>
            </Box>
            {address && awardedAuditor?.auditor?.toLowerCase() == address?.toLowerCase() && (
              <Button size="sm" onClick={() => handleMarkCompleted(escrowId)} pos="absolute" left="50%" transform="translateX(-50%)">Mark as completed!</Button>
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
                    <TruncatedText text={auditor?.auditor}/>
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
        {latestStatus !== null && latestStatus === 3 && viewFor === "company" && (
          <Button 
            size="sm" 
            onClick={() => handleVerifyCompletion(escrowId)} 
            pos="absolute" 
            left="50%" 
            transform="translateX(-50%)"
          >
            Verify Audit!
          </Button>
        )}
      </Box>
      {/* <Disqus config={disqusConfig} /> */}
    </Box>
  </Container>
)
}

export default ContractDetails