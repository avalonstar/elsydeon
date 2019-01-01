import { handleGetQuote } from '../quotes';

export default {
  name: 'quote',
  args: true,
  description: 'Fetch a quote from the quote database.',
  aliases: [],
  async execute(_client, message, args) { 
    const quote = await handleGetQuote(args, message);
    message.channel.send(quote);
  }
}
