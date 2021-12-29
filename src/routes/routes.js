'use strict';

const express = require('express'),
  v1Status = require('./v1/status'),
  v1Time = require('./v1/time'),
  healthcheck = require('./healthcheck'),
  notFound = require('./notFound'),
  swaggerDocument = require('../../swagger.json'),
  swaggerUi = require('swagger-ui-express'),
  validate = require('../middlesware/validate');

const router = express.Router();

router.get('/healthcheck', healthcheck.index);
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument, { explorer: true }));
router.get('/v1/status/ok', v1Status.getOk);
router.get('/v1/status/ready', v1Status.getReady);
router.post('/v1/status', validate.newStatus, v1Status.postStatus);
router.get('/v1/time', v1Time.getTime);
router.use(notFound.index);

module.exports = router;
