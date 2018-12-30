'use strict';

const chalk = require('chalk');
const dotenv = require('dotenv');

dotenv.load();

const logger = require('./utils/logger');
const db = require('./db');
const discord = require('./discord');
const twitch = require('./twitch');

logger.info(chalk.cyan.bold('Elsydeon says hello.'));

async function start() {
  await db();
  await discord();
  await twitch();
}

start();
