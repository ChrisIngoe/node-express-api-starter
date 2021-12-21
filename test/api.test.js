'use strict';

const app = require('../src/app'),
  request = require('supertest'),
  expect = require('chai').expect;

describe('API endpoint Integration Tests', function () {
  describe('#GET /', function () {
    it('should get OK response and an ok message', function (done) {
      request(app)
        .get('/')
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.exist;
          expect(res.body.message).to.equal('Ok');
          done();
        });
    });
  });
});
