'use strict';

const chalk = require('chalk');
const logger = require('winston');
const TwitchJS = require('twitch-js');

const punt = require('./punt');

const { TWITCH_IRC_PASSWORD, TWITCH_IRC_USERNAME } = process.env;
const options = {
  channels: ['#avalonstar'],
  identity: {
    username: TWITCH_IRC_USERNAME,
    password: TWITCH_IRC_PASSWORD
  }
};
const prefix = '!';

const handleMessage = (client, args) => {
  const [command, ...input] = args.message.split(' ');

  switch (command) {
    case 'punt':
      punt.handleInput(client, args);
      break;
    default:
      break;
  }
};

const initializeTwitch = () => {
  const client = new TwitchJS.client(options);
  client.connect();

  client.on('connected', (address, port) => {
    logger.info(
      `Twitch.js is connected to ${chalk.bold(`${address}:${port}`)}.`
    );
  });

  client.on('chat', (channel, userstate, message) => {
    if (!message.startsWith(prefix)) return;

    message = message.substring(prefix.length);
    handleMessage(client, { channel, userstate, message });
  });

  return client;
};

module.exports = async () => {
  await initializeTwitch();
};
