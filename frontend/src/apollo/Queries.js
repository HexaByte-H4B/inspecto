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