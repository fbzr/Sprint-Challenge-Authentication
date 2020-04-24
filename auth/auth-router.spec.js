const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// afterAll(async () => {
//     await db("users").truncate(); // after all tests empty the table and reset the id back to 1
// });

describe('POST /api/auth/register', () => {
    beforeEach(async () => {
        await db("users").truncate(); // empty the table and reset the id back to 1
    });

    const user = {
        username: 'test',
        password: '321654987'
    }

    it('should return 201 status', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({ username: user.username,  password: user.password });
        expect(res.status).toBe(201);
    });

    it('checks if hashed password maches', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({ username: user.username,  password: user.password });
            
        const passwordMatch = await bcrypt.compare(user.password, res.body.password);
        expect(passwordMatch).toBe(true);
    });

    it('checks if it returns the new user', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({ username: user.username,  password: user.password });

        expect(res.body).toEqual({
            id: 1,
            username: user.username,
            password: res.body.password
        });
    });

    it('checks if user was added to database', async () => {
        const res = await request(server)
            .post('/api/auth/register')
            .send({ username: user.username,  password: user.password });

        const dbUsers = await db('users');

        expect(dbUsers).toHaveLength(1);

        const dbUser = await db('users').where({ 
            id: 1,
            username: user.username,
            password: res.body.password
         }).first();

        expect(dbUser).toEqual({
            id: 1,
            username: user.username,
            password: res.body.password
        });
    });
});

describe('POST /api/auth/login', () => {
    const user = {
        username: 'test',
        password: '321654987'
    }

    it('should return status 401 passing wrong password', async () => {
        const res = await request(server)
            .post('/api/auth/login')
            .send({ username: user.username, password: '321654982' });
        
        expect(res.status).toBe(401);
        expect(res.body.errorMessage).toBe('Invalid password');
    });

    it('verify the token when 200', async () => {

        const res = await request(server)
            .post('/api/auth/login')
            .send(user);
        
        expect(res.status).toBe(200);

        const payload = {
            user: {
                id: 1
            }
        }
        const secret = process.env.JWT_SECRET || 'pgj56sf0kwp2rign8mv8p4o';
        const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
        });

        expect(token).toEqual(res.body.token);
    });
});