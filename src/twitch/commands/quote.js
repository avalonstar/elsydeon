import { handleGetQuote } from '../quotes';

export default {
  name: 'quote',
  args: true,
  description: 'Fetch a quote from the quote database.',
  aliases: [],
  async execute(client, payload, args) {
    await handleGetQuote(client, payload, args)
  }
}
