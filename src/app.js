process.env['NODE_CONFIG_DIR'] = __dirname + '/config';

const cors = require('cors'),
  config = require('config'),
  express = require('express'),
  swaggerDocument = require('../swagger.json'),
  swaggerUi = require('swagger-ui-express'),
  winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'server-side-events' },
  transports: [
    //new winston.transports.File({ filename: 'error.log', level: 'error' })
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  return res.json({ message: 'Ok' });
});

app.set('port', process.env.PORT || config.get('port'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = app.listen(app.get('port'), function () {
  logger.info('Express server listening on port ' + server.address().port);
});
