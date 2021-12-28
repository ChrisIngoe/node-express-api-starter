'use strict';

const logger = require('../../utils/logger');

exports.getOk = function (req, res) {
  logger.info('GET /v1/status/ok');
  return res.status(200).json({ message: 'Ok' });
};

exports.getReady = function (req, res) {
  logger.info('GET /v1/status/ready');
  return res.status(200).json({ message: 'Ready' });
};
