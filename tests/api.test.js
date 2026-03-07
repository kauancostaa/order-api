const request = require('supertest');
const app = require('../src/server');

describe('Order API', () => {
it('should return health check', async () => {
const response = await request(app).get('/health');
expect(response.status).toBe(200);
expect(response.body).toHaveProperty('status', 'healthy');
});
});
