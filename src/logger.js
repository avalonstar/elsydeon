import { createLogger, format, transports } from 'winston';

const formatParams = info => {
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp.slice(0, 19).replace('T', ' ');

  return `${ts} ${level}: ${message} ${
    Object.keys(args).length ? JSON.stringify(args, '', '') : ''
    }`;
};

const logger = createLogger({
  level: 'verbose',
  exitOnError: false,
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(formatParams)
  ),
  transports: [new transports.Console()]
});

export default logger;
