const request = require('supertest');
const app = require('../server');

describe('GET /ping', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/ping');
        expect(response.statusCode).toBe(200); });
});