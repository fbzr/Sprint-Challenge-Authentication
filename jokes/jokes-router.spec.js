const server = require('../api/server');
const request = require('supertest');
const db = require('../database/dbConfig');
const jwt = require('jsonwebtoken');

describe('GET /api/jokes', () => {
    beforeEach(async () => {
        await db("users").truncate(); // empty the table and reset the id back to 1
    });

    it('returns 401 status code without token', async () => {
        const res = await request(server).get('/api/jokes');
        expect(res.status).toBe(401);
    });

    it('verify token payload', async () => {
        const dummyUser = {
            username: 'test-jokes',
            password: '123456789'
        }
        
        // register
        await request(server)
            .post('/api/auth/register')
            .send(dummyUser);

        // login
        const loginRes = await request(server)
            .post('/api/auth/login')
            .send(dummyUser);

        // get token
        const token = loginRes.body.token;
        console.log('token', token);

        const dbUser = await db('users').where({username: dummyUser.username});
        console.log(dbUser);
        const secret = process.env.JWT_SECRET || 'pgj56sf0kwp2rign8mv8p4o';
        jwt.verify(token, secret, (error, decoded) => {
            expect(decoded.user.id).toBe(dbUser[0].id);
        });
    });

    
    // it('returns 200 status code after log in', async () => {
    //     const dummyUser = {
    //         username: 'test-jokes',
    //         password: '123456789'
    //     }
        
    //     // register
    //     await request(server)
    //         .post('/api/auth/register')
    //         .send(dummyUser);

    //     // login
    //     const loginRes = await request(server)
    //         .post('/api/auth/login')
    //         .send(dummyUser);

    //     // get token
    //     const token = loginRes.body.token;
        
    //     var base = {'Authorization': token, 'Content-Type': 'application/json'};
    //     const res = await request(server)
    //         .get('/api/jokes')
    //         .set(base);

    //     expect(res.status).toBe(200);
    // });

});