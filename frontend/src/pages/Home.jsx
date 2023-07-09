import React from 'react'
import { useEffect } from 'react'
import { useQueryRunner } from '../utils/useQueryRunner'
import { GetAllEscrowQuery } from '../apollo/Queries'
import Card from '../components/Card'
import { useState } from 'react'

function Home() {

  const [allEscrows, setAllEscrows] = useState([])

  const apolloRunner = useQueryRunner()
  const fetcher = async () => {
    const res = await apolloRunner(GetAllEscrowQuery, {})
    setAllEscrows(res.data.escrowCreateds)
    console.log(res)
  }

  useEffect(() => {
    fetcher()
  }, [])

  return (
    <>
      {allEscrows?.map((escrow) => (
        <Card
          key={escrow.id}
          id={escrow.escrowId}
          title={escrow.title}
          description={escrow.description}
          deposit={escrow.deposit}
          blockTimeStamp={escrow.blockTimeStamp}
          company={escrow.company}
          url={escrow.url}
        />
      ))}
    </>
  )
}

export default Home;