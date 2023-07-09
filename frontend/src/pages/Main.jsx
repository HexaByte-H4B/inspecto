import React from 'react';
import ensRegistry from '../abi/ensRegistry.json';
import { useContractWrite } from 'wagmi';

const CONTRACT_ADDRESS = "0x5a8391233E8821621986614ce1C2bcaA1dd5BF3C";

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
}

export default Main;