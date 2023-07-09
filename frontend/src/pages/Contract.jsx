import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetApplicantsQuery, GetContractDetailsQuery } from '../apollo/Queries'
import { useQueryRunner } from '../utils/useQueryRunner'
import ContractDetails from '../components/ContractDetails'

const Contract = () => {
  const params = useParams()
  const [escrowDetails, setEscrowDetails] = useState([])
  const [appliedAuditors, setAppliledAuditors] = useState([])

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
      <ContractDetails {...escrowDetails} appliedAuditors={appliedAuditors} />
    </div>
  )
}

export default Contract