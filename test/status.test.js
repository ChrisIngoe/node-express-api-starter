'use strict';

const app = require('../src/app'),
  request = require('supertest'),
  expect = require('chai').expect;

describe('Status API endpoint Integration Tests', function () {
  describe('#GET /v1/status/ok', function () {
    it('should get Ok response and an ok message', function (done) {
      request(app)
        .get('/v1/status/ok')
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
  describe('#GET /v1/status/ready', function () {
    it('should get Ok response and an ok message', function (done) {
      request(app)
        .get('/v1/status/ready')
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
  describe('#POST /v1/status', function () {
    it('should get Ok response and a status received message', function (done) {
      request(app)
        .post('/v1/status')
        .send({ status: 'new status' })
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.exist;
          expect(res.body.message).to.equal('New status received');
          done();
        });
    });
  });
});
