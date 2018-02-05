'use strict';

const chalk = require('chalk');
const dotenv = require('dotenv');

dotenv.load();

const logger = require('./src/utils/logger');

logger.info(chalk.cyan.bold('Elsydeon says hello.'));
