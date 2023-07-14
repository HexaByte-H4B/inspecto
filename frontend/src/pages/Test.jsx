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
    await write({
        // owner address is statically set for now. It should be fetched from the assigned auditor address
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