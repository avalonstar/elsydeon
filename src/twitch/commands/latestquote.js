import { handleGetLatestQuote } from '../../utils/quoteHandlers';

export default {
  name: 'latestquote',
  description: 'Fetch a the latest quote from the quote database.',
  aliases: ['lastquote'],
  async execute(client, { channel }) {
    const { id, quote } = await handleGetLatestQuote();
    client.say(channel, `/me grabs quote #${id}: “${quote.text}” ~ @${quote.quotee} , ${quote.year}`);
  }
}
