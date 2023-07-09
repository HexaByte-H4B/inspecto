import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ensRegistry from '../abi/ensRegistry.json';
import { getContract, getWalletClient } from '@wagmi/core';
import { useContractWrite } from 'wagmi';
//import useEscrowContract from '../utils/useEscrowContract';

const CONTRACT_ADDRESS = "0x5a8391233E8821621986614ce1C2bcaA1dd5BF3C";

function Main() {
  /*const func = async () => {
    const walletClient = await getWalletClient()
    const contract = getContract({
      address: '0x5a8391233E8821621986614ce1C2bcaA1dd5BF3C',
      abi: ensRegistry,
      walletClient
    })
    console.log(contract)
  }
  func();*/

  const walletClient = getWalletClient();
  
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ensRegistry,
    functionName: 'createEscrow',
    args: ['Example Titl', 'Example Descriptio', 'https://examle.com']
  })

  return (
    <>
      <ConnectButton />
      <button
        onClick={() =>
          write({
            args: ['Example Titl', 'Example Descriptio', 'https://examle.com'],
            value: '100000000000000000',
          })
        }
      >
        Create
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </>
  )
}

export default Main;