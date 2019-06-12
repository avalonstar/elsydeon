import { handleGetQuoteListSize } from '../quotes';

export default {
  name: 'howmanyquotes',
  description: 'Fetch the total number of quotes.',
  aliases: [],
  async execute(_client, message) {
    const quote = await handleGetQuoteListSize(message);
    message.channel.send(quote);
  },
};
