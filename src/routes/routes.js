'use strict';

const express = require('express'),
  apisV1 = require('./v1/status'),
  healthcheck = require('./healthcheck'),
  notFound = require('./notFound'),
  swaggerDocument = require('../../swagger.json'),
  swaggerUi = require('swagger-ui-express');

const router = express.Router();

router.get('/healthcheck', healthcheck.index);
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument, { explorer: true }));
router.get('/v1/ok', apisV1.getOk);
router.get('/v1/ready', apisV1.getReady);
router.use(notFound.index);

module.exports = router;
