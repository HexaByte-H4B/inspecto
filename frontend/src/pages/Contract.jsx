import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetApplicantsQuery, GetContractDetailsQuery } from '../apollo/Queries'
import { useQueryRunner } from '../utils/useQueryRunner'
import ContractDetails from '../components/ContractDetails'
import { useContractWrite } from 'wagmi'
import ensRegistry from '../abi/ensRegistry.json'

const CONTRACT_ADDRESS = "0x5a8391233E8821621986614ce1C2bcaA1dd5BF3C"; 
const NFT_CONTRACT_ADDRESS = "0xCb09B990E61e4Ff20D59de5f1039EB28872578B9";

const Contract = () => {
  const params = useParams()
  const [escrowDetails, setEscrowDetails] = useState([])
  const [appliedAuditors, setAppliledAuditors] = useState([])

  /* Assign a auditor */
  const assignAuditor = useContractWrite({
  // const { assignAuditorData, assignAuditorIsLoading, assignAuditorIsSuccess, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ensRegistry,
    functionName: 'assignAuditor',
  });

  const handleAssignAuditor = async (escrowId, applicationId) => {
    await assignAuditor.write({
      args: [escrowId, applicationId]
    });
  };

  // Apply as auditor
  const applyAsAuditor = useContractWrite({
  // const { applyAsAuditorData, applyAsAuditorIsLoading, applyAsAuditorIsSuccess, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ensRegistry,
    functionName: 'applyAsAuditor',
  });

  const handleApplyAuditor = async (escrowId) => {
    await applyAsAuditor.write({
      args: [escrowId]
    });
  };

  const apolloRunner = useQueryRunner()
  const fetcher = async () => {
    console.log('check param', params.contractId)
    try {
      const contractRes = await apolloRunner(GetContractDetailsQuery, {id: params.contractId})
      setEscrowDetails(contractRes.data.escrowCreateds[0])
      const auditorsRes = await apolloRunner(GetApplicantsQuery, {id: parseInt(params.contractId)})
      setAppliledAuditors(auditorsRes.data.auditorApplieds)
      console.log({auditorsRes})
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (params.contractId !== null)
      fetcher()
  }, [params])

  console.log(params)
  return (
    <div>
      <ContractDetails 
        {...escrowDetails} 
        appliedAuditors={appliedAuditors} 
        handleAssignAuditor={handleAssignAuditor} 
        handleApplyAuditor={handleApplyAuditor}
        viewFor={localStorage.getItem('role')}
      />
    </div>
  )
}

export default Contract