const request = require("supertest");
const auth = require("../../api/auth.js");
const db = require("../../data/config.js");
const server = require("../../api/server.js");

describe('user router function', () => {

    const example_professor = {
        id: 1,
        name: "Schroeder",
        email: "Schroeder@gmail.com",
        password: "superposition",
    };

    let token;

    beforeEach(async () => {
        token = auth.generateToken(example_professor);
        await db("projects")
            .truncate()
            .then(() => db("users").truncate());
        return db("users")
            .insert(example_professor)
    });

    describe('GET @ /api/users', async () => {
        it('should return 201 status', async () => {
            const res = await request(server)
                .get('/api/users')
                .set('Authorization', token);
            expect(res.status).toBe(201);
        })
        it('should return a JSON message', async () => {
            const res = await request(server)
                .get('/api/users')
                .set('Authorization', token);
            expect(res.type).toMatch(/json/i);
        })
        it('should return a list of users', async () => {
            const res = await request(server)
                .get('/api/users')
                .set('Authorization', token);
            expect(res.body.users).toEqual([example_professor]);
        })
    })

    describe('GET @ /api/users/:id', async () => {
        it('should return a 201 status', async () => {
            const res = await request(server)
                .get(`/api/users/${example_professor.id}`)
                .set('Authorization', token);
            expect(res.status).toBe(201);
        })
        it('should return a user object with set id', async () => {
            const res = await request(server)
                .get(`/api/users/${example_professor.id}`)
                .set('Authorization', token);
            expect(res.body.user).toEqual(example_professor);
        })
        it('should return a 404 if user does not exist', async () => {
            const res = await request(server)
                .get(`/api/users/4548`)
                .set('Authorization', token);
            expect(res.status).toBe(404);
        })
    })

    describe('PUT @ /api/users:id', async () => {

        const updated_user = {
            name: 'updated name',
            email: 'updated@email.com'
        }

        it('should return 201 status', async () => {
            const res = await request(server)
                .put(`/api/users/1`)
                .send(updated_user)
                .set('Authorization', token);
            expect(res.status).toBe(201);
        })
        it('should return a new user object with same id', async () => {
            const res = await request(server)
                .put(`/api/users/1`)
                .send(updated_user)
                .set('Authorization', token);
            expect(res.body.update.name).toEqual(updated_user.name);
        })
        it('should return 401 if not logged in and trying to access list', async () => {
            const res = await request(server)
                .put(`/api/users/1`)
                .send(updated_user)
            expect(res.status).toBe(401);
        })
    })

    describe('DELETE @ /api/users/:id', async () => {
        it('should return 201', async () => {
            const res = await request(server)
                .del('/api/users/1')
                .set('Authorization', token);
            expect(res.status).toBe(201)
        })
        it('should return list of users -1', async () => {
            const res = await request(server)
                .del('/api/users/1')
                .set('Authorization', token);
            const users = await db('users')
            expect(users.length).toBe(0)
        })
        it('should return JSON success message', async () => {
            const res = await request(server)
                .del('/api/users/1')
                .set('Authorization', token);
            expect(res.type).toMatch(/json/i)
        })

    })

})