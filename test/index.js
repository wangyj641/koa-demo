import supertest from 'supertest';
import { expect } from 'chai';
import app from '../index.js';

const request = supertest(app.listen())

describe('Start to test GET APIs', () => {
  const apiArray = [
    '/api/data/last24hourAvg',
    '/api/data/last48hourAvg',
    '/api/data/lastWeekAvg',
    '/api/data/lastMonthAvg'
  ];

  apiArray.forEach((api) => {
    it(api, (done) => {
      console.log('GET: ' + api);
      request
        .get(api)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.be.an('string')
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })
})

describe('Start to test POST APIs', () => {
  const apiArray = [
    '/api/user/login',
    '/api/sensor/data',
    '/api/sensor/csv',
  ];

  apiArray.forEach((api) => {
    it(api, (done) => {
      console.log('POST: ' + api);
      request
        .post(api)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('object')
          expect(res.status).to.be.an('number')
          done()
        })
    })
  })
})
