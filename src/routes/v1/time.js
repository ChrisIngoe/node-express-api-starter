'use strict';

const logger = require('../../utils/logger'),
  timeService = require('../../services/timeService');

exports.getTime = function (req, res) {
  logger.info('GET /v1/time');
  timeService.getTime(function (err, time) {
    if (err) {
      logger.error(`Error getting time. ${err}`);
      return res.status(500).json({ error: 'Internal server error' });
    } else {
      return res.status(200).json(time);
    }
  });
};
