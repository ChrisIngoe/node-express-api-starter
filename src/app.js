process.env['NODE_CONFIG_DIR'] = __dirname + '/config';

const cors = require('cors'),
  config = require('config'),
  express = require('express'),
  helmet = require('helmet'),
  swaggerDocument = require('../swagger.json'),
  swaggerUi = require('swagger-ui-express'),
  healthcheck = require('./routes/healthcheck'),
  notFound = require('./routes/notFound'),
  apis = require('./routes/apis'),
  winston = require('winston');

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

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.get('/healthcheck', healthcheck.index);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', apis.index);
app.use(notFound.index);

app.set('port', process.env.PORT || config.get('port'));
const server = app.listen(app.get('port'), function () {
  logger.info('Express server listening on port ' + server.address().port);
});

module.exports = server;
