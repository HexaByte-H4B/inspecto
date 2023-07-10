import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetApplicantsQuery, GetAssignedAuditorQuery, GetContractDetailsQuery } from '../apollo/Queries'
import { useQueryRunner } from '../utils/useQueryRunner'
import ContractDetails from '../components/ContractDetails'
import { useContractWrite } from 'wagmi'
import ensRegistry from '../abi/ensRegistry.json'

const CONTRACT_ADDRESS = "0x0CDd1d8AaFa5e9B6ad5e5cC0E5dF25361aDa9E42"; 
const NFT_CONTRACT_ADDRESS = "0xCb09B990E61e4Ff20D59de5f1039EB28872578B9";

const Contract = () => {
  const params = useParams()
  const [escrowDetails, setEscrowDetails] = useState([])
  const [appliedAuditors, setAppliledAuditors] = useState([])
  const [awardedAuditor, setAwardedAuditor] = useState({})

  /* Assign a auditor */
  const assignAuditor = useContractWrite({
  // const { assignAuditorData, assignAuditorIsLoading, assignAuditorIsSuccess, write } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ensRegistry,
    functionName: 'assignAuditor',
  });

  const handleAssignAuditor = async (escrowId, applicationId) => {
    console.log({applicationId})
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

  const markCompleted = useContractWrite({ 
    address: CONTRACT_ADDRESS, 
    abi: ensRegistry, 
    functionName: 'markCompleted', 
  }); 
 
  const handleMarkCompleted = async () => { 
    await markCompleted.write({ 
      args: ['0'] 
    }); 
  };

  const apolloRunner = useQueryRunner()
  const fetcher = async () => {
    // console.log('check param', params.contractId)
    try {
      const contractRes = await apolloRunner(GetContractDetailsQuery, {id: params.contractId})
      setEscrowDetails(contractRes.data.escrowCreateds[0])
      const assignedAuditorsRes = await apolloRunner(GetAssignedAuditorQuery, {id: parseInt(params.contractId)})
      // console.log('assignedAuditorsRes', assignedAuditorsRes)
      setAwardedAuditor(assignedAuditorsRes.data.auditorAssigneds[0])
      const auditorsRes = await apolloRunner(GetApplicantsQuery, {id: parseInt(params.contractId)})
      setAppliledAuditors(auditorsRes.data.auditorApplieds)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (params.contractId !== null)
      fetcher()
  }, [params])

  // console.log(params)
  return (
    <div>
      <ContractDetails 
        {...escrowDetails} 
        appliedAuditors={appliedAuditors} 
        awardedAuditor={awardedAuditor}
        handleAssignAuditor={handleAssignAuditor} 
        handleApplyAuditor={handleApplyAuditor}
        handleMarkCompleted={handleMarkCompleted}
        viewFor={localStorage.getItem('role')}
      />
    </div>
  )
}

export default Contract