import { handleGetLatestQuote } from '../../utils/quoteHandlers';

export default {
  name: 'latestquote',
  description: 'Fetch a the latest quote from the quote database.',
  aliases: ['lastquote'],
  async execute(client, { channel }) {
    const quote = await handleGetLatestQuote();
    client.say(channel, `/me grabs the most recent quote (#${quote.id}): ${quote.text} ~ @${quote.quotee}`);
  }
}
