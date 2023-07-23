export const GetAllEscrowQuery = `
  query {
    escrowCreateds(orderBy: blockTimestamp, orderDirection: desc) {
        id
        deposit
        title
        description
        escrowId
        blockTimestamp
        company
        url
    }
  }
`

export const GetContractDetailsQuery = `
  query($id: Bytes!) {
    escrowCreateds(where: {escrowId: $id}) {
      company
      blockTimestamp
      deposit
      escrowId
      description
      id
      title
      url
    }
  }
`

export const GetApplicantsQuery = `
  query($id: Int!) {
    auditorApplieds(where: {escrowId: $id}) {
      id
      escrowId
      applicationId
      auditor
    }
  }
`

export const GetAssignedAuditorQuery = `
  query($id: Int!) {
    auditorAssigneds(where: {escrowId: $id}) {
      id
      auditor
      escrowId
    }
  }
`

export const GetLatestStatusByEscrowIdQuery = `
  query($id: Int!) {
    escrowStatusUpdateds(
      orderBy: blockTimestamp
      orderDirection: desc
      where: {escrowId: $id}
      first: 1
    ) {
      id
      status
      escrowId
    }
  }
`

export const GetNftReportsQuery = `
  query($recipient: String!) {
    nftminteds(where: { recipient: $recipient }) {
      recipient
      tokenURI
      tokenId
      id
    }
  }
`