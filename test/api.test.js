'use strict';

const app = require('../src/app'),
  request = require('supertest'),
  expect = require('chai').expect;

describe('API endpoint Integration Tests', function () {
  describe('#GET /v1/ok', function () {
    it('should get Ok response and an ok message', function (done) {
      request(app)
        .get('/v1/ok')
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
  describe('#GET /v1/ready', function () {
    it('should get Ok response and an ok message', function (done) {
      request(app)
        .get('/v1/ready')
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.exist;
          expect(res.body.message).to.equal('Ready');
          done();
        });
    });
  });
});
