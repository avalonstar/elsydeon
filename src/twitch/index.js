'use strict';

const chalk = require('chalk');
const logger = require('winston');
const TwitchJS = require('twitch-js');

const options = {
  channels: ['#avalonstar'],
  identity: {
    username: process.env.TWITCH_IRC_USERNAME,
    password: process.env.TWITCH_IRC_PASSWORD
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

  return client;
};

module.exports = async () => {
  await initializeTwitch();
};
