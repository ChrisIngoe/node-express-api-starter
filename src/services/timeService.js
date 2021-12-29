'use strict';

const axios = require('axios'),
  config = require('config');

exports.getTime = function (callback) {
  axios
    .get(config.get('time.url'))
    .then(function (response) {
      return callback(null, response.data);
    })
    .catch(function (error) {
      return callback(error);
    });
};
