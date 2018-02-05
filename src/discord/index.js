'use strict';

const logger = require('winston');
const Discord = require('discord.js');

const polls = require('./polls');
const quotes = require('./quotes');

const prefix = '!';

const handleMessage = async message => {
  const memberRole = message.member.roles;
  const staffRole = message.guild.roles.find('name', 'Staff');
  const [command, ...input] = message.content.split(' ');

  switch (command) {
    case 'poll':
      const isStaff = memberRole.has(staffRole.id);
      isStaff && polls.handleInput(input.join(' '), message);
      break;
    case 'quote':
      const quote = await quotes.handleGetInput(input);
      message.channel.send(quote);
      break;
    default:
      break;
  }
};

const initializeDiscord = () => {
  const client = new Discord.Client();
  client.login(process.env.DISCORD_TOKEN);

  client.on('ready', () => {
    client.user.setPresence({ game: { name: 'avalonstar.tv', type: 3 } });
    logger.info('Discord.js is connected.');
  });

  client.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    message.content = message.content.substring(prefix.length);
    handleMessage(message);
  });

  return client;
};

module.exports = async () => {
  await initializeDiscord();
};
