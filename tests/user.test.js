const request = require('supertest');
const app = require('../app'); // Assuming app.js exports the express app
const User = require('../models/user');

afterEach(async () => {
    await User.deleteMany();
});

describe('User API', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
    });

    it('should log in an existing user', async () => {
        await request(app)
            .post('/users')
            .send({
                name: 'Login User',
                email: 'login@example.com',
                password: 'password123',
            });

        const res = await request(app)
            .post('/users/login')
            .send({
                email: 'login@example.com',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
    });

});
