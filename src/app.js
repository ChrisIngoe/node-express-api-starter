const cors = require('cors'),
  config = require('config'),
  express = require('express'),
  helmet = require('helmet'),
  routes = require('./routes/routes'),
  xss = require('xss-clean');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(xss());

app.set('port', process.env.PORT || config.get('port'));
app.use('/', routes);

module.exports = app;
