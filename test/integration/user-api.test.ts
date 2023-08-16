import request from 'supertest';
import { app, sequelize, createSeedData } from '../test-setup';
import { User } from '../test-environment/db/index.ts';

beforeAll(async () => {
    await sequelize.sync();
    const res = await User.findOne({
        where: {
            id: 2,
        },
    });
    if (res == null) await createSeedData();
    await sequelize.sync();
});

describe('POST /users', () => {
    it('이메일이 올바르지 않다면, 에러를 반환한다.', done => {
        request(app)
            .post('/users')
            .send({ email: 'testemail', password: 'testpassword' })
            .expect(401)
            .expect({ message: 'email validation error' })
            .end(done);
    });

    it('비밀번호가 올바르지 않다면, 에러를 반환한다.', done => {
        request(app)
            .post('/users')
            .send({ email: 'testemail@gg.com', password: 'testpwd' })
            .expect(401)
            .expect({ message: 'password validation error' })
            .end(done);
    });

    it('중복된 이메일이라면, 에러를 반환한다.', done => {
        request(app)
            .post('/users')
            .send({
                email: 'user1@example.com',
                password: 'password1',
            })
            .expect(401)
            .expect(res => {
                expect(res.body.message).toBe('error');
                expect(res.body.step).toBe('user');
                expect(res.body.err.name).toBe(
                    'SequelizeUniqueConstraintError',
                );
            })
            .end(done);
    });

    it('올바른 입력이라면, 쿼리 결과를 반환한다.', done => {
        request(app)
            .post('/users')
            .send({ email: 'user123@example.com', password: 'password123' })
            .expect(200)
            .expect(res => {
                expect(res.body).toHaveProperty('user');
                expect(res.body).toHaveProperty('credential');
            })
            .end(done);
    });
});

describe('POST /users/login', () => {
    it('이메일 형식이 올바르지 않다면, 에러를 반환한다.', done => {
        request(app)
            .post('/users/login')
            .send({ email: 'user123', password: 'password123' })
            .expect(401)
            .expect({ message: 'email validation error' })
            .end(done);
    });
    it('비밀번호 형식이 올바르지 않다면, 에러를 반환한다.', done => {
        request(app)
            .post('/users/login')
            .send({ email: 'user123@example.com', password: 'passwrd' })
            .expect(401)
            .expect({ message: 'password validation error' })
            .end(done);
    });

    it('비밀번호가 맞지 않다면, 에러를 반환한다.', done => {
        request(app)
            .post('/users/login')
            .send({ email: 'user123@example.com', password: 'wrongPassword' })
            .expect(401)
            .expect({ message: 'validationError' })
            .end(done);
    });
    it('올바른 입력이라면, jwt를 담은 쿠키를 반환한다.', done => {
        request(app)
            .post('/users/login')
            .send({ email: 'user123@example.com', password: 'password123' })
            .expect(200)
            .expect(res => {
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('jwtToken');
                const cookie = res.header['set-cookie'][0];
                expect(res.header['set-cookie']).toBeDefined();
                expect(cookie).toEqual(expect.stringContaining('token='));
                expect(cookie).toEqual(expect.stringContaining('HttpOnly'));
            })
            .end(done);
    });
});
describe('POST /users/logout', () => {
    const agent = request.agent(app);
    beforeEach(done => {
        agent
            .post('/users/login')
            .send({ email: 'user123@example.com', password: 'password123' })
            .end(done);
    });
    it('로그인되어 있지 않다면, 에러를 반환한다.', done => {
        request(app)
            .post('/users/logout')
            .expect(403)
            .expect({
                status: 'error',
                statusCode: 403,
                message: '로그인되어 있지 않습니다!',
            })
            .end(done);
    });
    it('로그아웃이 완료되면, 메세지를 반환한다.', done => {
        agent
            .post('/users/logout')
            .expect(200)
            .expect({ message: 'logout ok' })
            .expect(res => {
                expect(res.headers['set-cookie']).toHaveLength(1);
            })
            .end(done);
    });
});

describe('DELETE /users', () => {
    const agent = request.agent(app);
    beforeEach(done => {
        agent
            .post('/users/login')
            .send({ email: 'user123@example.com', password: 'password123' })
            .end(done);
    });
    it('로그인되어 있지 않다면, 에러를 반환한다.', done => {
        request(app)
            .delete('/users')
            .expect(403)
            .expect({
                status: 'error',
                statusCode: 403,
                message: '로그인되어 있지 않습니다!',
            })
            .end(done);
    });
    it('로그인이 되어있다면, 쿠키를 삭제하고 쿼리 결과를 반환한다.', done => {
        agent
            .delete('/users')
            .expect(200)
            .expect(res => {
                expect(res.body).toBe(1);
                expect(res.headers['set-cookie']).toHaveLength(1);
            })
            .end(done);
    });
});

afterAll(async () => {
    await User.destroy({
        where: {
            email: 'user123@example.com',
        },
    });
});
