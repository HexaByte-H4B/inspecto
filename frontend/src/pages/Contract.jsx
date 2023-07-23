import React, { useEffect, useState } from 'react'
import { DiscussionEmbed } from 'disqus-react';
import { useParams } from 'react-router-dom'
import { GetApplicantsQuery, GetAssignedAuditorQuery, GetContractDetailsQuery, GetLatestStatusByEscrowIdQuery } from '../apollo/Queries'
import { useQueryRunner } from '../utils/useQueryRunner'
import ContractDetails from '../components/ContractDetails'
import { useContractWrite } from 'wagmi'
import ensRegistry from '../abi/ensRegistry.json'

const CONTRACT_ADDRESS = "0x7b42206074F3e04637988b9aeFF2fe19957dE6cA"; 
const NFT_CONTRACT_ADDRESS = "0xCb09B990E61e4Ff20D59de5f1039EB28872578B9";

export default function Contract() {
  const params = useParams()
  const [escrowDetails, setEscrowDetails] = useState([])
  const [appliedAuditors, setAppliledAuditors] = useState([])
  const [awardedAuditor, setAwardedAuditor] = useState({})
  const [latestStatus, setLatestStatus] = useState(null)

  const disqusConfig = {
    shortname: 'your_disqus_shortname',
    config: { identifier: params.contractId, title: 'Contract Page' }
  };

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
 
  const handleMarkCompleted = async (escrowId) => { 
    await markCompleted.write({ 
      args: [escrowId] 
    }); 
  };

  const verifyCompletion = useContractWrite({ 
    address: CONTRACT_ADDRESS, 
    abi: ensRegistry, 
    functionName: 'verifyCompletion', 
  }); 
 
  const handleVerifyCompletion = async (escrowId) => { 
    await verifyCompletion.write({ 
      args: [escrowId, true] 
    }); 
  };

  const apolloRunner = useQueryRunner()
  const fetcher = async () => {
    // console.log('check param', params.contractId)
    try {
      const statusRes = await apolloRunner(GetLatestStatusByEscrowIdQuery, {id: parseInt(params.contractId)})
      console.log('statusRes', statusRes.data.escrowStatusUpdateds)
      setLatestStatus(statusRes.data.escrowStatusUpdateds[0].status)
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
        latestStatus={latestStatus}
        handleAssignAuditor={handleAssignAuditor} 
        handleApplyAuditor={handleApplyAuditor}
        handleMarkCompleted={handleMarkCompleted}
        handleVerifyCompletion={handleVerifyCompletion}
        viewFor={localStorage.getItem('role')}
      />
      <DiscussionEmbed {...disqusConfig} />
    </div>
  )
};