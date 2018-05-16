'use strict';

const chalk = require('chalk');
const dotenv = require('dotenv');

dotenv.load();

const logger = require('./src/utils/logger');
const db = require('./src/db');
const discord = require('./src/discord');
const twitch = require('./src/twitch');

logger.info(chalk.cyan.bold('Elsydeon says hello.'));

async function start() {
  await db();
  await discord();
  // await twitch();
}

start();
