const request = require('supertest');
const server = require('../../../src/server');

describe('[Create Event] Test Endpoint /events', () => {
  const requestBody = {
    judul: 'Seminar Fasilkom',
    deskripsi: 'Seminar Fasilkom',
    urlFotoPamflet: 'https://via.placeholder.com/120x350',
    urlPendaftaran: 'https://bit.ly/seminarfasilkom2021',
    waktuAcara: '2021-06-19T09:56:25.087Z',
  };
  let response;
  beforeEach(async () => {
    response = await server.then((s) => request(s.listener)
      .post('/events')
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
      .toHaveProperty('message', 'Event Berhasil Ditambah')
      .toHaveProperty('data')
      .toHaveProperty('data.eventId')
      .toMatchObject({
        status: expect.any(String),
        message: expect.any(String),
        data: {
          eventId: expect.any(String),
        },
      });
  });

  afterEach(async () => {
    // Saving eventId to env vars
    process.env.eventId = response.body.data.eventId;
    await server.then((e) => e.stop());
  });
});
