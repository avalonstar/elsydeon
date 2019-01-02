import { handleGetLatestQuote } from '../quotes';

export default {
  name: 'latestquote',
  description: 'Fetch a the latest quote from the quote database.',
  aliases: ['lastquote'],
  async execute(client, payload) {
    await handleGetLatestQuote(client, payload);
  }
}
