import { handleQuoteListSize } from '../../utils/quoteHandlers';

export default {
  name: 'howmanyquotes',
  description: 'Fetch the total number of quotes.',
  aliases: ['numberofquotes', 'quotecount'],
  async execute(client, { channel }) {
    const { count } = await handleQuoteListSize();
    client.say(channel, `/me sees ${count} quotes in the database.`);
  }
}
