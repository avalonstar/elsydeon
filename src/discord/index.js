/* eslint-disable no-param-reassign */

'use strict';

const logger = require('winston');
const Discord = require('discord.js');

const polls = require('./polls');
const announce = require('./announce');
const quotes = require('./quotes');

const prefix = '!';

const handleMessage = async message => {
  const memberRole = message.member.roles;
  const staffRole = message.guild.roles.find('name', 'Staff');
  const [command, ...input] = message.content.split(' ');

  switch (command) {
    case 'addquote': {
      quotes.handleAddQuote(input, message);
      break;
    }
    case 'howmanyquotes': {
      quotes.handleGetQuoteListSize(message);
      break;
    }
    case 'latestquote': {
      const quote = await quotes.handleGetLatestQuote();
      message.channel.send(quote);
      break;
    }
    case 'ping': {
      message
        .reply(
          `da fuq do you think I am? A robot? <:DerpDerp:431196977263411211>`
        )
        .catch(console.error);
      break;
    }
    case 'poll': {
      const isStaff = memberRole.has(staffRole.id);
      isStaff && polls.handleInput(input, message);
      break;
    }
    case 'quote': {
      const quote = await quotes.handleGetQuote(input, message);
      message.channel.send(quote);
      break;
    }
    case 'notify': {
      announce.subscribeToNotifications(message);
      break;
    }
    case 'unnotify': {
      announce.unsubscribeFromNotifications(message);
      break;
    }
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

  announce(client);
  return client;
};

module.exports = async () => {
  await initializeDiscord();
};
