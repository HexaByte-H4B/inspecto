import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import { useCallback } from "react"

export function useQueryRunner() {
    return useCallback(async (query, variables) => {
      let API_URL = "https://api.studio.thegraph.com/query/41653/escrow-subgraph/0.0.1"
    
      const client = new ApolloClient({
        uri: API_URL,
        cache: new InMemoryCache(),
      })
      
      const data = await client.query({
        query: gql(query),
        variables: variables,
      })
  
      return data
    }, [])
  }