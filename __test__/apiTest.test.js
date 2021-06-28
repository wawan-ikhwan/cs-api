const request = require('supertest');
const server = require('../src/server');
const ownerToken = require('../dev/generateownerauth');

const environment = {
  email: `test${+new Date()}-auth@gmail.com`,
  password: 'secretpasswordhmm',
  nama: '{nama tester}',
  urlFotoOrmawa: '{foto ormawa test}',
  ormawaId: 'undefined',
  accessToken: 'undefined',
  refreshToken: 'undefined',
  eventId: 'undefined',
};

describe('[Create Ormawa] Test Endpoint /ormawa', () => {
  const requestBody = {
    email: environment.email,
    password: environment.password,
    nama: environment.nama,
    urlFotoOrmawa: environment.urlFotoOrmawa,
  };
  let response;
  beforeAll(async () => {
    const token = await ownerToken;
    response = await server.then((s) => request(s.listener)
      .post('/ormawa')
      .set('Authorization', `Bearer ${token}`)
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

  it('json body should be same with the expected values', () => {
    expect(response.body).toMatchObject({
      status: 'success',
      message: expect.any(String),
      data: {
        ormawaId: expect.any(String),
      },
    });
  });

  afterAll(async () => {
    // Saving ormawaId to env vars
    environment.ormawaId = response.body.ormawaId;
  });
});

describe('[Auth Login] Test Endpoint /auth', () => {
  const requestBody = {
    email: environment.email,
    password: environment.password,
  };
  let response;
  beforeAll(async () => {
    response = await server.then((s) => request(s.listener)
      .post('/auth')
      .send(requestBody)
      .accept('application/json')
      .expect((res) => res.body.data));
  });

  it('should be 200 http code', () => {
    expect(response.statusCode).toStrictEqual(200);
  });

  it('should return json body', () => {
    expect(response.headers['content-type']).toMatch('application/json');
  });

  it('json body should be same with the expected values', () => {
    expect(response.body).toMatchObject({
      status: 'success',
      message: expect.any(String),
      data: {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      },
    });
  });

  afterAll(async () => {
    // Saving token to env vars
    environment.accessToken = response.body.data.accessToken;
    environment.refreshToken = response.body.data.refreshToken;
  });
});

describe('[Auth Refresh] Test Endpoint /auth', () => {
  let response;
  beforeAll(async () => {
    response = await server.then((s) => request(s.listener)
      .put('/auth')
      .send({
        refreshToken: environment.refreshToken,
      })
      .accept('application/json')
      .expect((res) => res.body.data));
  });

  it('should be 200 http code', () => {
    expect(response.statusCode).toStrictEqual(200);
  });

  it('should return json body', () => {
    expect(response.headers['content-type']).toMatch('application/json');
  });

  it('json body should be same with the expected values', () => {
    expect(response.body).toMatchObject({
      status: 'success',
      message: 'token berhasil diperbarui',
      data: {
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      },
    });
  });

  afterAll(async () => {
    // Saving token to env vars
    environment.accessToken = response.body.data.accessToken;
    environment.refreshToken = response.body.data.refreshToken;
  });
});

describe('[Create Event] Test Endpoint /events', () => {
  const requestBody = {
    judul: 'test27-Seminar Fasilkom',
    deskripsi: 'test27-Seminar Fasilkom',
    urlFotoPamflet: 'https://via.placeholder.com/120x350',
    urlPendaftaran: 'https://bit.ly/seminarfasilkom2021',
    waktuAcara: '2021-06-19T09:56:25.087Z',
  };
  let response;
  beforeAll(async () => {
    response = await server.then((s) => request(s.listener)
      .post('/events')
      .set('Authorization', `Bearer ${environment.accessToken}`)
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

  it('json body should be same with the expected values', () => {
    expect(response.body).toMatchObject({
      status: 'success',
      message: expect.any(String),
      data: {
        eventId: expect.any(String),
      },
    });
  });

  afterAll(async () => {
    // Saving eventId to env vars
    environment.eventId = response.body.data.eventId;
  });
});

describe('[Read All Events] Test Endpoint /events', () => {
  let response;
  beforeAll(async () => {
    response = await server.then((s) => request(s.listener)
      .get('/events')
      .accept('application/json')
      .expect((res) => res.body.data));
  });

  it('should be 200 http code', () => {
    expect(response.statusCode).toStrictEqual(200);
  });

  it('should return json body', () => {
    expect(response.headers['content-type']).toMatch('application/json');
  });

  it('json body should be same with the expected values', () => {
    expect(response.body).toMatchObject({
      status: 'success',
      data: {
        events: expect.any(Array),
      },
    });
  });

  it('json body.data.events should be array of objects', () => {
    expect(response.body.data.events).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          idOrmawa: expect.any(String),
          judul: expect.any(String),
          deskripsi: expect.any(String),
          urlFotoPamflet: expect.any(String),
          urlPendaftaran: expect.any(String),
          waktuAcara: expect.any(String),
          waktuDitambah: expect.any(String),
        }),
      ]),
    );
  });
});

describe('[Read an Event] Test Endpoint /events/:eventId', () => {
  let response;
  beforeAll(async () => {
    response = await server.then((s) => request(s.listener)
      .get(`/events/${environment.eventId}`)
      .accept('application/json')
      .expect((res) => res.body.data));
  });

  it('should be 200 http code', () => {
    expect(response.statusCode).toStrictEqual(200);
  });

  it('should return json body', () => {
    expect(response.headers['content-type']).toMatch('application/json');
  });

  it('json body should be same with the expected values', () => {
    expect(response.body).toMatchObject({
      status: 'success',
      data: {
        event: {
          id: expect.any(String),
          idOrmawa: expect.any(String),
          judul: expect.any(String),
          deskripsi: expect.any(String),
          urlFotoPamflet: expect.any(String),
          urlPendaftaran: expect.any(String),
          waktuAcara: expect.any(String),
          waktuDitambah: expect.any(String),
        },
      },
    });
  });
});

describe('[Update an Event] Test Endpoint /events/:eventId', () => {
  const requestBody = {
    judul: 'test27-Seminar Nasional Fasilkom',
    deskripsi: 'test27-Seminar Nasional Fasilkom Updated',
    urlFotoPamflet: 'https://via.placeholder.com/120x350',
    urlPendaftaran: 'https://bit.ly/seminarnasionalfasilkom2021',
    waktuAcara: '2021-06-22T10:00:00.000Z',
  };
  let response;
  beforeAll(async () => {
    response = await server.then((s) => request(s.listener)
      .put(`/events/${environment.eventId}`)
      .set('Authorization', `Bearer ${environment.accessToken}`)
      .send(requestBody)
      .accept('application/json')
      .expect(200));
  });

  it('should be 200 http code', () => {
    expect(response.statusCode).toStrictEqual(200);
  });

  it('should return json body', () => {
    expect(response.headers['content-type']).toMatch('application/json');
  });

  it('json body should be same with the expected values', () => {
    expect(response.body).toMatchObject({
      status: 'success',
      message: 'event berhasil diupdate',
    });
  });
});

describe('[Search and Read All Events] Test Endpoint /events', () => {
  let response;
  beforeAll(async () => {
    response = await server.then((s) => request(s.listener)
      .get('/events?search=nasion')
      .accept('application/json')
      .expect((res) => res.body.data));
  });

  it('should be 200 http code', () => {
    expect(response.statusCode).toStrictEqual(200);
  });

  it('should return json body', () => {
    expect(response.headers['content-type']).toMatch('application/json');
  });

  it('json body should be same with the expected values', () => {
    expect(response.body).toMatchObject({
      status: 'success',
      data: {
        events: expect.any(Array),
      },
    });
  });

  it('json body.data.events should be array of objects', () => {
    expect(response.body.data.events).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          idOrmawa: expect.any(String),
          judul: 'test27-Seminar Nasional Fasilkom',
          deskripsi: expect.any(String),
          urlFotoPamflet: expect.any(String),
          urlPendaftaran: expect.any(String),
          waktuAcara: expect.any(String),
          waktuDitambah: expect.any(String),
        }),
      ]),
    );
  });
});

describe('[Delete an Event] Test Endpoint /events/:eventId', () => {
  let response;
  beforeAll(async () => {
    response = await server.then((s) => request(s.listener)
      .delete(`/events/${environment.eventId}`)
      .set('Authorization', `Bearer ${environment.accessToken}`)
      .accept('application/json')
      .expect(200));
  });

  it('should be 200 http code', () => {
    expect(response.statusCode).toStrictEqual(200);
  });

  it('should return json body', () => {
    expect(response.headers['content-type']).toMatch('application/json');
  });

  it('json body should be same with the expected values', () => {
    expect(response.body).toMatchObject({
      status: 'success',
      message: 'event berhasil dihapus',
    });
  });
});

describe('[Auth Logout] Test Endpoint /auth', () => {
  let response;
  beforeAll(async () => {
    response = await server.then((s) => request(s.listener)
      .delete('/auth')
      .send({
        refreshToken: environment.refreshToken,
      })
      .accept('application/json')
      .expect(200));
  });

  it('should be 200 http code', () => {
    expect(response.statusCode).toStrictEqual(200);
  });

  it('should return json body', () => {
    expect(response.headers['content-type']).toMatch('application/json');
  });

  it('json body should be same with the expected values', () => {
    expect(response.body).toMatchObject({
      status: 'success',
      message: 'delete auth berhasil',
    });
  });
});

afterAll(async () => {
  await server.then((s) => s.stop());
});
