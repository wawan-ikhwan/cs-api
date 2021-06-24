const request = require('supertest');
const server = require('../../../src/server');

describe('[Read an Event] Test Endpoint /events/:eventId', () => {
  let response;
  beforeEach(async () => {
    response = await server.then((s) => request(s.listener)
      .get('/events/:id')
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
      .toHaveProperty('data')
      .toHaveProperty('data.event')
      .toMatchObject({
        status: 'success',
        data: {
          event: {
            ormawaId: expect.any(String),
            judul: expect.any(String),
            deskripsi: expect.any(String),
            urlFotoPamflet: expect.any(String),
            urlPendaftaran: expect.any(String),
            waktuAcara: expect.any(Date),
          },
        },
      });
  });

  afterEach(async () => {
    await server.then((e) => e.stop());
  });
});
