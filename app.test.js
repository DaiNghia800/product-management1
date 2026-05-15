const request = require('supertest');
const app = require('./index.js');
const mongoose = require('mongoose'); 

describe('API Routing Integration Tests', () => {
  it('Should return HTTP 200 OK for the Health Check route', async () => {
    const res = await request(app).get('/health'); 
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});