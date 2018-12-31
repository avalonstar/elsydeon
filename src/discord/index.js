/* eslint-disable no-param-reassign */

import Discord from 'discord.js';

import * as roles from './roles';
import * as quotes from './quotes';

import logger from '../logger';

const polls = require('./polls');
const announce = require('./announce');

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
      roles.subscribeToNotifications(message);
      break;
    }
    case 'unnotify': {
      roles.unsubscribeFromNotifications(message);
      break;
    }
    case 'assign': {
      roles.assignRole(message);
      break;
    }
    case 'unassign': {
      roles.unassignRole(message);
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
    client.user.setPresence({ game: { name: 'avalonstar.tv (test)', type: 3 } });
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

export default async () => {
  await initializeDiscord();
};
