import React from 'react';
import ensRegistry from '../abi/ensRegistry.json';
import { useContractWrite } from 'wagmi';

const CONTRACT_ADDRESS = "0x5a8391233E8821621986614ce1C2bcaA1dd5BF3C";

function Main() {
  /* 
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
}

export default Main;