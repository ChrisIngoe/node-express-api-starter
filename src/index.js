const app = require('./app'),
  winston = require('winston');

let server;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'server-side-events' },
  transports: [
    //new winston.transports.File({ filename: 'error.log', level: 'error' })
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  }),
);

server = app.listen(app.get('port'), function () {
  logger.info('Express server listening on port ' + server.address().port);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

module.exports = server;
