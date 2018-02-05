'use strict';

const chalk = require('chalk');
const dotenv = require('dotenv');

dotenv.load();

const logger = require('./src/utils/logger');
const discord = require('./src/discord');

logger.info(chalk.cyan.bold('Elsydeon says hello.'));

async function start() {
  await Promise.all([discord()]);
}

start();
