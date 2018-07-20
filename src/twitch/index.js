/* eslint-disable new-cap */
/* eslint-disable no-param-reassign */

'use strict';

const _ = require('lodash');
const chalk = require('chalk');
const logger = require('winston');
const TwitchJS = require('twitch-js');

const commands = require('./commands');
const quotes = require('./quotes');
const vanity = require('./vanity');

const { TWITCH_IRC_PASSWORD, TWITCH_IRC_USERNAME } = process.env;
const options = {
  channels: ['#avalonstar'],
  identity: {
    username: TWITCH_IRC_USERNAME,
    password: TWITCH_IRC_PASSWORD
  }
};
const prefix = '!';

const getCommand = (command, client, input, args) => {
  const list = {
    // Quotes.
    addquote: () => quotes.handleAddQuote(client, input, args),
    howmanyquotes: () => quotes.handleQuoteListSize(client, args),
    latestquote: () => quotes.handleGetLatestQuote(client, args),
    quote: () => quotes.handleGetQuote(client, input, args),

    // Miscellaneous.
    andback: () => commands.andback(client, args),
    forward: () => commands.forward(client, args),
    fuckedd: () => commands.fuckedd(client, args),
    fiesta: () => commands.fiesta(client, args),
    hype: () => commands.hype(client, args),
    punt: () => commands.punt(client, args),
    slap: () => commands.slap(client, input, args),
    subhype: () => commands.subhype(client, args),
    yoship: () => commands.yoship(client, args),

    // Vanity.
    heybryan: () => vanity.heybryan(client, args),
    heyeasy: () => vanity.heyeasy(client, args),
    heyfires: () => vanity.heyfires(client, args),
    heyheather: () => vanity.heyheather(client, args),
    heykay: () => vanity.heykay(client, args),
    provoke: () => vanity.provoke(client, args)
  };

  return Object.keys(list).includes(command) && list[command]();
};

const greetings = [
  `says hello. avalonDERP`,
  `boops your nose. avalonBLEP`,
  `scolds you for not cleaning up after yourself. avalonBAKA`,
  `could not find the balls. avalonBLIND`,
  `thinks your cute. avalonEYES`,
  `is attracted to you. avalonSHY`,
  `after realizing that you're not wearing pants: avalonWAAH`,
  `kicked your RNG in the groin. avalonPLS`,
  `knows what you did last summer. avalonO`,
  `isn't here. avalonLURK`,
  `gives you a hug because you deserve it. avalonHUG`
];

const handleMessage = (client, params, args) =>
  getCommand(params.command, client, params.input, args);

const initializeTwitch = () => {
  const client = new TwitchJS.client(options);
  client.connect();

  client.on('connected', (address, port) => {
    logger.info(
      `Twitch.js is connected to ${chalk.bold(`${address}:${port}`)}.`
    );
  });

  client.on('roomstate', channel => {
    client.action(channel, _.sample(greetings));
  });

  client.on('chat', (channel, userstate, message) => {
    if (!message.startsWith(prefix)) return;

    message = message.substring(prefix.length);
    const [command, ...input] = message.split(' ');
    handleMessage(client, { command, input }, { channel, userstate, message });
  });

  return client;
};

module.exports = async () => {
  await initializeTwitch();
};
