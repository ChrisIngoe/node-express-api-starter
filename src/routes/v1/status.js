'use strict';

exports.getOk = function (req, res) {
  return res.status(200).json({ message: 'Ok' });
};

exports.getReady = function (req, res) {
  return res.status(200).json({ message: 'Ready' });
};
