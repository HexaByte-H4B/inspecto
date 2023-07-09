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