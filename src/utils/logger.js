const { createLogger, format, transports } = require('winston'),
  config = require('config');

module.exports = createLogger({
  level: config.get('logging.level'),
  format: format.json(),
  defaultMeta: { service: config.get('service.name') },
  transports: [
    new transports.Console({
      format: format.simple(),
    }),
    new transports.File({
      filename: `logs/${config.get('logging.fileName')}`,
      format: format.combine(
        format.timestamp({ format: 'DD-MMM-YYYY HH:mm:ss' }),
        format.align(),
        format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`),
      ),
    }),
  ],
});
