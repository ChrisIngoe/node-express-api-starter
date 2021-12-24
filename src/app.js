const cors = require('cors'),
  config = require('config'),
  express = require('express'),
  helmet = require('helmet'),
  routes = require('./routes/routes'),
  winston = require('winston'),
  xss = require('xss-clean');

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
app.use(express.urlencoded({ extended: true }));
app.use(xss());

app.set('port', process.env.PORT || config.get('port'));
app.use('/', routes);

module.exports = app;
