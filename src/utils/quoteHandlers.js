import { GraphQLClient, gql } from 'graphql-request'
import random from 'random'

const endpoint = 'https://api.landale.app/graphql'
const client = new GraphQLClient(endpoint)

const handleQuoteListSize = async () => {
  const query = await client.query(
    q.Paginate(q.Match(q.Index('quotes_sort_by_ref'))),
  )
  const result = query.data[0]
  return result[1].id
}

const handleAddQuote = async payload => {
  const size = await handleQuoteListSize()
  const id = parseInt(size) + 1
  const addQuote = client.query(
    q.Create(q.Ref(q.Collection('Quotes'), id), { data: payload }),
  )
}

const handleGetLatestQuote = async () => {
  const query = await client.query(
    q.Get(q.Match(q.Index('quotes_sort_by_ref'))),
  )
  return query.data
}

const handleGetQuoteById = async id => {
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

const handleGetQuoteByTerm = async term => {
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

module.exports = {
  handleAddQuote,
  handleGetLatestQuote,
  handleGetQuoteById,
  handleGetQuoteByTerm,
  handleGetRandomQuote,
  handleQuoteListSize,
}
