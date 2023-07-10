import React from 'react';
import ensRegistry from '../abi/ensRegistry.json';
import nftMintAbi from '../abi/nftMintAbi.json';
import { useContractWrite } from 'wagmi';
import { DiscussionEmbed } from 'disqus-react'

const CONTRACT_ADDRESS = "0x5a8391233E8821621986614ce1C2bcaA1dd5BF3C";
const NFT_CONTRACT_ADDRESS = "0xCb09B990E61e4Ff20D59de5f1039EB28872578B9";

const disqusConfig = {
  url: window.location.href,
  identifier: ,
  title: "Comments",
}
function Main() {
  /* Apply as auditor
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ensRegistry,
    functionName: 'applyAsAuditor',
  });

  const handleApplyAuditor = async () => {
    await write({
      args: ['0']
    });
  };

  return (
    <>
      <button onClick={handleApplyAuditor}>Apply</button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </>
  );
  */

  /* Assign a auditor
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ensRegistry,
    functionName: 'assignAuditor',
  });

  const handleAssignAuditor = async () => {
    await write({
      args: ['0', '0']
    });
  };

  return (
    <>
      <button onClick={handleAssignAuditor}>Assign</button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </>
  );
  */

  /* Mark completed
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ensRegistry,
    functionName: 'markCompleted',
  });

  const handleMarkCompleted = async () => {
    await write({
      args: ['0']
    });
  };

  return (
    <>
      <button onClick={handleMarkCompleted}>Mark Completed</button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </>
  );
  */

  /* Mark verified and paid to the stakeholders (auditor, platform)
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ensRegistry,
    functionName: 'verifyCompletion',
  });

  const handleVerifyCompletion = async () => {
    await write({
      args: ['0', true]
    });
  };

  return (
    <>
      <button onClick={handleVerifyCompletion}>Mark Verified</button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </>
  );
  */

  /*
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: nftMintAbi,
    functionName: 'mintNFT',
  });

  const handleMintNft = async () => {
    await write({
      args: ['0x257fad1733820E27Cc5132f00d018B019f02c254', 'ipfs://bafyreiavczajvadwybbwm7ur5qra3wstibcs3iaslzkh7qhkbj6dlsitsq/metadata.json']
    });
  };

  return (
    <>
      <button onClick={handleMintNft}>Mint NFT</button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </>
  );
  */  
  <DiscussionEmbed
    // __css={{}}
    shortname='chainpact'
    config={
      disqusConfig
    }
  />
}

export default Main;