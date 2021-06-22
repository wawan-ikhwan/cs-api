const request = require('supertest');
// const server = require('../../../src/server');
const server = require('../../../src/server');

describe('Create Ormawa Test Endpoint /ormawa', () => {
  const requestBody = {
    error: 'Not Found',
    message: 'Not Found',
    statusCode: 404,
  };
  let response;
  beforeEach(async () => {
    response = await server.then((s) => request(s.listener)
      .post('/ormawa')
      .send({ ...requestBody })
      .accept('application/json')
      .expect(404)
      .expect((res) => res.body.data));
  });
  it('should be 404 http code', async () => {
    expect(response.body).toMatchObject(requestBody);
  });

  it('should return json body', () => {
    expect(response.headers['content-type']).toMatch('application/json');
  });

  afterEach(async () => {
    await server.then((e) => e.stop());
  });
});
