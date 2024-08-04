const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

test('Dever responder na porta 3001', async () => {
    const res = await request.get('/');
    expect(res.status).toBe(200);
    console.log('O servidor foi iniciado na porta 3001');
});