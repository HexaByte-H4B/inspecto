export const GetAllEscrowQuery = `
  query {
    escrowCreateds {
        id
        deposit
        title
        description
        escrowId
        blockTimestamp
    }
  }
`