import { GraphQLClient, gql } from 'graphql-request'
import { Quote } from 'types'

const endpoint = 'https://api.landale.app/graphql'
const client = new GraphQLClient(endpoint)

const handleAddQuote = async (payload: Quote)  => {
  const mutation = gql`
    mutation AddQuote(
      $quotee: String!, 
      $quoter: String!, 
      $text: String!, 
      timestamp: Date!,
      year: String!
    ) {
      addQuote(quote: {
        quotee: $quotee,
        quoter: $quoter,
        text: $text,
        timestamp: $timestamp
        year: $year,
      }) {
        quotee
        quoter
        text
        timestamp
        year
      }
    }
  `

  try {
    await client.request(mutation, payload)
  } catch (e) {
    console.error(e)
  }
}

const handleGetLatestQuote = async () => {
  const query = gql`
    query {
      latestQuote {
        id
        text
        quotee
        quoter
        timestamp
      }
    }
  `

  const result = await client.request(query)
  return result.latestQuote
}

const handleGetQuoteById = async (id: number) => {
  const query = gql`
    query getQuoteById($id: Int!) {
      quote(id: $id) {
        id
        text
        quotee
        quoter
        timestamp
      }
    }
  `

  try {
    const result = await client.request(query, { id })
    return result.quote
  } catch (e) {
    return null
  }
}

const handleGetQuoteByTerm = async (term: string) => {
  const query = gql`
    query getQuoteById($term: String!) {
      quote(term: $term) {
        id
        text
        quotee
        quoter
        timestamp
      }
    }
  `

  try {
    const result = await client.request(query, { term })
    return result.quote
  } catch (e) {
    return null
  }
}

const handleGetRandomQuote = async () => {
  const query = gql`
    query {
      quote {
        id
        text
        quotee
        quoter
        timestamp
      }
    }
  `

  const result = await client.request(query)
  return result.quote
}

const handleQuoteListSize = async () => {
  const query = gql`
    query {
      quoteCount
    }
  `

  const result = await client.request(query)
  return result
}

export {
  handleAddQuote,
  handleGetLatestQuote,
  handleGetQuoteById,
  handleGetQuoteByTerm,
  handleGetRandomQuote,
  handleQuoteListSize,
}
