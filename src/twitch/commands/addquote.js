import { handleAddQuote } from '../quotes';

export default {
  name: 'addquote',
  args: true,
  description: 'Add a quote to the quote database.',
  aliases: ['quoteadd'],
  async execute(client, payload, args) {
    await handleAddQuote(client, payload, args)
  }
}
