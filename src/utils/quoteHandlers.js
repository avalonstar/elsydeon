import faunadb from 'faunadb'
import random from 'random'

const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET_KEY })

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
  const query = await client.query(q.Get(q.Ref(q.Collection('Quotes'), id)))
  console.log('query', query)
  return query.data
}

const handleGetQuoteByQuotee = async quotee => {
  const query = await client.query(q.Match(q.Index('quotes_by_quotee'), quotee))
  return query.data
}

const handleGetQuotes = async () => {
  const size = await handleQuoteListSize()
  const id = random.int(1, parseInt(size, 10))
  const quote = await handleGetQuoteById(id)
  return { id, quote }
}

module.exports = {
  handleAddQuote,
  handleGetLatestQuote,
  handleGetQuoteById,
  handleGetQuoteByQuotee,
  handleGetQuotes,
  handleQuoteListSize,
}
