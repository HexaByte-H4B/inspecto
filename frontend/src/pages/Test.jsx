import { Button, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useContractWrite } from 'wagmi';
import nftMintAbi from '../abi/nftMintAbi.json';

const NFT_CONTRACT_ADDRESS = "0xCb09B990E61e4Ff20D59de5f1039EB28872578B9";

export default function Test() {
  const [uri, setURI] = useState('');
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: nftMintAbi,
    functionName: 'mintNFT',
  });

  const handleChange = (event) => {
    setURI(event.target.value);
  };

  const handleMintNFT = async () => {
    // Call your function here using the URI value
    //console.log(`URI: ${uri}`);
    await write({
        args: ['0x257fad1733820E27Cc5132f00d018B019f02c254', uri]
      });
  };

  useEffect(() => {
    if (isSuccess) {
      alert('NFT Minted sucessfully!');
    }
  }, [isSuccess]);

  return (
    <>
      <Input
        value={uri}
        onChange={handleChange}
        placeholder="Enter URI"
      />

      <Button onClick={handleMintNFT}>Verify complete</Button>
    </>
  );
};