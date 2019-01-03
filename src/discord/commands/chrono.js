import getSaleEmbed from '../chrono';

export default {
  name: 'chrono',
  description: 'Displays the daily Chrono.gg deal.',
  aliases: ['cgg', 'chronogg'],
  async execute(_client, message) { 
    const embed = await getSaleEmbed();
    message.channel.send({ embed })
  }
}
