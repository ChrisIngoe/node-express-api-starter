const Joi = require('joi'),
  logger = require('../utils/logger');

exports.newStatus = function (req, res, next) {
  const newStatus = req.body;
  const schema = Joi.object()
    .keys({
      status: Joi.string().min(1).max(10).required(),
    })
    .required();
  const { error } = schema.validate(newStatus);
  if (error) {
    logger.error(`Error validating newStatus payload. ${error}`);
    return res.status(400).send('Bad request');
  } else {
    next();
  }
};
