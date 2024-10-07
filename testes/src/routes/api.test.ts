import { response } from 'express';
import request from 'supertest';
import app from '../app';
import { User } from '../models/User';

describe('Testando rotas da API', () => { //.skip

    let email = 'test@jest.com';
    let password = '1234';

    beforeAll(async () => {
        await User.sync({ force: true });
    });

    it('Deve ping pong', (done) => {
        request(app)
            .get('/ping')
            .then(response => {
                expect(response.body.pong).toBeTruthy();
                return done();
            });
    });

    it('Deve registrar um novo usuário', (done) => {
        request(app)
            .post('/register')
            .send(`email=${email}&password=${password}`) // formato URL
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty('id');
                return done();
            });
    });

    it('Não deve registrar um novo usuário com email existente', (done) => {
        request(app)
            .post('/register')
            .send(`email=${email}&password=${password}`)
            .then(response => {
                expect(response.body.error).not.toBeUndefined();
                return done();
            });
    });

    it('Não deve registrar um usuário sem a senha', (done) => {
        request(app)
            .post('/register')
            .send(`email=${email}`)
            .then(response => {
                expect(response.body.error).not.toBeUndefined();
                return done();
            });
    });

    it('Não deve registrar um usuário sem o email', (done) => {
        request(app)
            .post('/register')
            .send(`password=${password}`)
            .then(response => {
                expect(response.body.error).not.toBeUndefined();
                return done();
            });
    });

    it('Não deve registrar um usuário sem os dados', (done) => {
        request(app)
            .post('/register')
            .send('')
            .then(response => {
                expect(response.body.error).not.toBeUndefined();
                return done();
            });
    });

    it('Deve logar corretamente', (done) => {
        request(app)
        .post('/login')
        .send(`email=${email}&password=${password}`)
        .then(response => {
            expect(response.body.status).toBe(true);
            return done();
        });
    });

    it('Não deve logar com os dados incorretos', (done) => {
        request(app)
        .post('/login')
        .send(`email=${email}&password=wrongpassword`)
        .then(response => {
            expect(response.body.status).toBe(false);
            return done();
        });
    });

    // it('Deve listar todos os usuários', (done) => {
    //     request(app)
    //         .get('/list')
    //         .then(response => {
    //             expect(response.body.error).toBeUndefined();
    //             expect(Array.isArray(response.body.list)).toBe(true);
    //             return done();
    //         });
    // });

});