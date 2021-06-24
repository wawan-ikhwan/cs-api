const request = require('supertest');
const server = require('../../../src/server');

describe('[Auth Login] Test Endpoint /authentications', () => {
  const reqBody = {
    email: '{testmail}',
    password: '{testpassword}',
  };
  let response;
  beforeEach(async () => {
    response = await server.then((s) => request(s.listener)
      .post('/authentications')
      .send(reqBody)
      .accept('application/json')
      .expect((res) => res.body.data));
  });

  it('should be 200 http code', () => {
    expect(response.statusCode).toStrictEqual(200);
  });

  it('should return json body', () => {
    expect(response.headers['content-type']).toMatch('application/json');
  });

  it('json body should be same with the expected values', async () => {
    expect(response.body)
      .toHaveProperty('status', 'success')
      .toHaveProperty('message', 'Berhasil Autentikasi')
      .toHaveProperty('data')
      .toHaveProperty('data.accessToken')
      .toHaveProperty('data.refreshToken')
      .toMatchObject({
        status: 'success',
        message: 'Berhasil Autentikasi',
        data: {
          accessToken: 'randomToken',
          refreshToken: 'randomToken',
        },
      });
  });

  afterEach(async () => {
    // Saving token to env vars
    process.env.accessToken = response.body.data.accessToken;
    process.env.refreshToken = response.body.data.refreshToken;
    // Terminating server
    await server.then((e) => e.stop());
  });
});
