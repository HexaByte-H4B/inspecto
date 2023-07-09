import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import ensRegistry from '../abi/ensRegistry.json';
import { useContractWrite } from 'wagmi';

const CONTRACT_ADDRESS = "0x5a8391233E8821621986614ce1C2bcaA1dd5BF3C";

// Function to convert decimal to wei
const convertToWei = (value) => {
  const decimalValue = parseFloat(value);
  const weiValue = decimalValue * 1e18;
  return weiValue.toString();
};

export default function ContractUpload() {
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ensRegistry,
    functionName: 'createEscrow',
  });

  const handleCreateEscrow = async (event) => {
    event.preventDefault(); // Prevent form submission and page reload

    const title = event.target.title.value;
    const description = event.target.desc.value;
    const link = event.target.repoLink.value;
    const bountyAmount = event.target.bountyValue.value;

    // Convert bountyAmount from decimal to wei
    const bountyAmountWei = convertToWei(bountyAmount);

    await write({
      args: [title, description, link],
      value: bountyAmountWei,
    });
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Upload your contract details
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to get audited by our wardens ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleCreateEscrow}>
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input type="text" name="title" />
              </FormControl>
              <FormControl id="desc" isRequired>
                <FormLabel>Description</FormLabel>
                <Input type="text" name="desc" />
              </FormControl>
              <FormControl id="repoLink" isRequired>
                <FormLabel>Repository Link</FormLabel>
                <Input type="text" name="repoLink" />
              </FormControl>
              <FormControl id="bountyValue" isRequired>
                <FormLabel>Bounty Amount (decimal value)</FormLabel>
                <Input type="text" name="bountyValue" />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Uploading..."
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Upload
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}