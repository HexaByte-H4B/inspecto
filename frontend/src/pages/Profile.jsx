import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNFTMintedQueryRunner } from '../utils/useNFTMintedQueryRunner'
import { GetNftReportsQuery } from '../apollo/Queries'

function Profile() {
  const [allNfts, setAllNfts] = useState([])

  const apolloRunner = useNFTMintedQueryRunner()
  const fetcher = async () => {
    const res = await apolloRunner(GetNftReportsQuery, {})
    setAllNfts(res.data.nftminteds)
    console.log(res.data.nftminteds)
  }

  useEffect(() => {
    fetcher()
  }, [])
  return (
    <>
      {/* {allNfts?.map((nft) => (<div>{nft.recipient}</div>))} */}
      <div>Profile</div>
    </>
  )
}

export default Profile