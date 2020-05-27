const request = require("supertest");
const auth = require("../../api/auth.js");
const db = require("../../data/config.js");
const server = require("../../api/server.js");

describe('messages router function', () => {

    const example_professor = {
        id: 1,
        name: "Schroeder",
        email: "Schroeder@gmail.com",
        password: "superposition",
    };


    const example_student = {
        id: 1,
        professor_id: 1,
        name: "Bob",
        email: "bob@gmail.com",
    };

    const example_message = {
        id: 1,
        title: 'test title',
        body: 'test body',
        professor_id: 1,
        student_id: null,
        time_to_send: '2020-28-08',
        sent: 'false',
    };

    let token;

    beforeEach(async () => {
        token = auth.generateToken(example_professor);
        await db("projects")
            .truncate()
            .then(() => db("students").truncate())
            .then(() => db("users").truncate())
            .then(() => db('messages').truncate());
        return db("users")
            .insert(example_professor)
            .then(() => db("students").insert(example_student))
            .then(() => db('messages').insert(example_message));
    });

    describe('GET @ /api/messages', () => {
        it('should return 201 status on request', async () => {
            const res = await request(server)
                .get('/api/messages')
                .set('Authorization', token);
            expect(res.status).toBe(201);
        });
        it('should return a JSON message', async () => {
            const res = await request(server)
                .get('/api/messages')
                .set('Authorization', token);
            expect(res.type).toMatch(/json/i);
        });
        it('should generate a list', async () => {
            const res = await request(server)
                .get('/api/messages')
                .set('Authorization', token);
            expect(res.body.appMessages).toEqual([example_message]);
        })
    })
    describe('GET @ /api/messages/:id', () => {
        it('should return 201 status', async () => {
            const res = await request(server)
                .get(`/api/messages/${example_message.id}`)
                .set('Authorization', token);
            expect(res.status).toBe(201);
        })
        it('should return JSON message', async () => {
            const res = await request(server)
                .get(`/api/messages/${example_message.id}`)
                .set('Authorization', token);
            expect(res.type).toMatch(/json/i);
        })
        it('should return a message', async () => {
            const res = await request(server)
                .get(`/api/messages/${example_message.id}`)
                .set('Authorization', token);
            expect(res.body.appMessage).toEqual(example_message);
        })
    })

    describe('POST @ /api/messages', () => {

        const new_message = {
            title: "test title",
            body: "test body",
            time_to_send: "2020-28-08",
            sent: "false"
        };

        it('should return 201 status', async () => {
            const res = await request(server)
                .post('/api/messages/')
                .send(new_message)
                .set('Authorization', token);
            expect(res.status).toBe(201);
        })

        it('should return new message', async () => {
            const res = await request(server)
                .post('/api/messages')
                .send(new_message)
                .set('Authorization', token);
            expect(res.body.newMessage.title).toBe(example_message.title);
        })
    })

    describe('PUT @ /api/messages/:id', () => {

        const updated_message = {
            title: "new test title",
            body: "new test body",
            time_to_send: "2020-15-10",
            sent: "true"
        }

        it('should return 201', async () => {
            const res = await request(server)
                .put('/api/messages/1')
                .send(updated_message)
                .set('Authorization', token);
            expect(res.status).toBe(201);
        })
        it('should return updated message', async () => {
            const res = await request(server)
                .put('/api/messages/1')
                .send(updated_message)
                .set('Authorization', token);
            expect(res.body.updatedMessage.sent)
                .toEqual("true");
        })
        it('should return 404 if message id does not exist', async () => {
            const res = await request(server)
                .put('/api/messages/2341')
                .send(updated_message)
                .set('Authorization', token);
            expect(res.status).toBe(404)
        })
        it("should return 500 if user is not logged in", async () => {
            const res = await request(server)
                .put('/api/messages/1')
                .send(updated_message);
            expect(res.status).toBe(401)
        })
    })

    describe('DELETE @ /api/messages/:id', () => {

        it('should return 201 when message deleted', async () => {
            const res = await request(server)
                .del('/api/messages/1')
                .set('Authorization', token);
            expect(res.status).toBe(201)
        })

        it('should return list without the message object', async () => {
            const res = await request(server)
                .del('/api/messages/1')
                .set('Authorization', token);
            const messages = await db('messages')
            expect(messages.length).toBe(0)
        })

        it('should return a JSON success message', async () => {
            const res = await request(server)
                .del('/api/messages/1')
                .set('Authorization', token);
            expect(res.type).toMatch(/json/i)
        })

    })
})