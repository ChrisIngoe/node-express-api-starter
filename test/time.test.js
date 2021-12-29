'use strict';

const app = require('../src/app'),
  request = require('supertest'),
  sinon = require('sinon'),
  expect = require('chai').expect,
  timeService = require('../src/services/timeService');

describe('Time API endpoint Integration Tests', function () {
  describe('#GET /v1/time', function () {
    it('should get Ok response and a time object', function (done) {
      request(app)
        .get('/v1/time')
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.timeZoneName).to.exist;
          expect(res.body.timeZoneName).to.equal('UTC');
          done();
        });
    });
  });
});
describe('Time API endpoint Component Tests', function () {
  let timeServiceStub;
  beforeEach(function () {
    timeServiceStub = sinon.stub(timeService, 'getTime').yields(null, { timeZoneName: 'test' });
  });
  afterEach(function () {
    timeServiceStub.restore();
  });
  describe('#GET /v1/time with mocked Time service', function () {
    it('should get Ok response and a time object', function (done) {
      request(app)
        .get('/v1/time')
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.timeZoneName).to.exist;
          expect(res.body.timeZoneName).to.equal('test');
          done();
        });
    });
  });
});
describe('Time API endpoint Component Test Failures', function () {
  let timeServiceStub;
  beforeEach(function () {
    timeServiceStub = sinon.stub(timeService, 'getTime').yields({ message: 'Test error message' });
  });
  afterEach(function () {
    timeServiceStub.restore();
  });
  describe('#GET /v1/time with mocked Time service error', function () {
    it('should get 500 status and a internal server error', function (done) {
      request(app)
        .get('/v1/time')
        .expect(500)
        .end(function (err, res) {
          if (err) {
            done(err);
          }
          expect(res.statusCode).to.equal(500);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.exist;
          expect(res.body.error).to.equal('Internal server error');
          done();
        });
    });
  });
});
