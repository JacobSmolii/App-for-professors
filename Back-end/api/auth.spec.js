const request = require("supertest");
const auth = require('./auth.js');
const db = require("../data/config.js");
const server = require("./server.js");
const Users = require('../router/users/users-models.js');
const bcrypt = require('bcryptjs')


describe('authentication process', () => {

    const new_user = {
        name: "Bill",
        email: 'bill@email.com',
        password: 'testpass'
    }


    beforeEach(async () => {
        await db('users').truncate()
    })

    describe('POST @ /api/auth/register', () => {
        it('add new user with the credentials to the database', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send(new_user)
            const usersDB = await db('users');
            console.log(await db('users'))
            expect(usersDB).toHaveLength(1);
        })
        it('generate a token for the user', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send(new_user)
            expect(res.body.token).toBeTruthy()
        })
    })

    describe('POST @ /api/auth/login', () => {

        const logged_user = {
            name: "bill",
            email: 'bill@email.com',
            password: 'testpass'
        }

        beforeEach(async () => {
            token = auth.generateToken(logged_user)
            await db('users').truncate()
            return db('users').insert({
                name: logged_user.name,
                email: logged_user.email,
                password: bcrypt.hashSync(logged_user.password)
            })
            .catch(err => console.log(err))
        })

        it('find the user by their email', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send(logged_user)
                expect(res.body.email).toEqual(logged_user.email)
        })
        it('reject invalid email if not registered email', async () => {

            const non_user = {
                name: "ted",
                email: 'ted@email.com',
                password: 'tedspass'
            }

            const res = await request(server)
                .post('/api/auth/login')
                .send(non_user)
                expect(res.status).toBe(404)

        })

        it('reject invalid password if invalid password', async () => {

            const res = await request(server)
                .post('/api/auth/login')
                .send({...logged_user, password: 'ted@email.com'})
                expect(res.status).toBe(401)

        })

    })

})