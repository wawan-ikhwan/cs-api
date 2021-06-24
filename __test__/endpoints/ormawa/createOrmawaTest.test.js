const request = require('supertest');
const server = require('../../../src/server');

describe('[Create Ormawa] Test Endpoint /ormawa', () => {
  const requestBody = {
    email: '{testmail}',
    password: '{testpassword}',
    nama: '{testname}',
    urlFotoUser: '{testuserphoto}',
  };
  let response;
  beforeEach(async () => {
    response = await server.then((s) => request(s.listener)
      .post('/ormawa')
      .send(requestBody)
      .accept('application/json')
      .expect((res) => res.body.data));
  });

  it('should be 201 http code', () => {
    expect(response.statusCode).toStrictEqual(201);
  });

  it('should return json body', () => {
    expect(response.headers['content-type']).toMatch('application/json');
  });

  it('json body should be same with the expected values', async () => {
    expect(response.body)
      .toHaveProperty('status', 'success')
      .toHaveProperty('message', 'Ormawa ditambahkan')
      .toHaveProperty('data')
      .toHaveProperty('data.ormawaId')
      .toMatchObject({
        status: expect.any(String),
        message: expect.any(String),
        data: {
          ormawaId: expect.any(String),
        },
      });
  });

  afterEach(async () => {
    // Saving ormawaId to env vars
    process.env.ormawaId = response.body.ormawaId;
    await server.then((e) => e.stop());
  });
});
