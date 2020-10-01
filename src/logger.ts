import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'verbose',
  exitOnError: false,
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(nfo => {
      return `${nfo.timestamp} ${nfo.level}: ${nfo.message}`;
    })
  ),
  transports: [new transports.Console()]
});

export default logger;
