import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
//import useEscrowContract from '../utils/useEscrowContract';
import ensRegistry from '../'

export default function Main() {
  const escrowContract = useEscrowContract();
  console.log(escrowContract);
  return (
    <>
      <ConnectButton />
    </>
  )
};