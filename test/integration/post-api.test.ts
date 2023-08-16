import request from 'supertest';
import { app, sequelize, createSeedData } from '../test-setup';
import { Post } from '../test-environment/db/index.ts';

beforeAll(async () => {
    await sequelize.sync();
    const res = await Post.findOne({
        where: {
            id: 2,
        },
    });
    if (res == null) await createSeedData();
    await sequelize.sync();
});

describe('GET /posts/:offset', () => {
    it('0 이하의 숫자가 들어오면, status 500 undefined 에러를 반환한다', done => {
        request(app)
            .get('/posts/0')
            .expect(500)
            .expect('"에러가 발생했습니다. 코드 : undefined"')
            .end(done);
    });
    it('올바른 offset이 들어오면, 5개의 데이터를 반환한다.', done => {
        request(app)
            .get('/posts/1')
            .expect(200)
            .expect(res => {
                expect(res.body.length).toBe(5);
                const singleData = res.body[0];
                expect(singleData).toHaveProperty('id');
                expect(singleData).toHaveProperty('title');
                expect(singleData).toHaveProperty('user_id');
                expect(singleData).toHaveProperty('PostContent');
            })
            .end(done);
    });
    it('존재 페이지보다 큰 값이 들어오면, 빈 array를 반환한다.', done => {
        request(app).get('/posts/15').expect(200).expect([]).end(done);
    });
});

describe('GET /id/:id', () => {
    it('올바른 값이 들어오면 데이터를 반환한다.', done => {
        request(app)
            .get('/posts/id/2')
            .expect(200)
            .expect(res => {
                expect(res.body).toHaveProperty('id');
                expect(res.body).toHaveProperty('title');
                expect(res.body).toHaveProperty('user_id');
                expect(res.body).toHaveProperty('PostContent');
            })
            .end(done);
    });
    it('존재하지 않는 아이디가 들어오면, null을 반환한다.', done => {
        request(app).get('/posts/id/2000').expect(200).expect(null).end(done);
    });
});

describe('POST /posts', () => {
    const agent = request.agent(app);
    beforeEach(done => {
        agent
            .post('/users/login')
            .send({
                email: 'user1@example.com',
                password: 'password1',
            })
            .end(done);
    });
    it('로그인되어 있지 않다면, 에러를 반환한다.', done => {
        request(app)
            .post('/posts')
            .send({ title: 'testtitle', content: 'testcontent' })
            .expect(403)
            .expect({
                status: 'error',
                statusCode: 403,
                message: '로그인되어 있지 않습니다!',
            })
            .end(done);
    });
    it('로그인되어 있다면, 입력된 데이터 쿼리 결과를 리턴한다.', done => {
        agent
            .post('/posts')
            .send({ title: 'testtitle', content: 'testcontent' })
            .expect(200)
            .expect(res => {
                expect(res.body).toHaveProperty('post');
                expect(res.body).toHaveProperty('postContent');
            })
            .end(done);
    });
});

describe('PUT /posts/:id', () => {
    const agent = request.agent(app);
    beforeEach(done => {
        agent
            .post('/users/login')
            .send({
                email: 'user1@example.com',
                password: 'password1',
            })
            .end(done);
    });
    it('로그인되어 있지 않다면, 에러를 반환한다.', done => {
        request(app)
            .put('/posts/2')
            .send({ title: 'testtitle', content: 'testcontent' })
            .expect(403)
            .expect({
                status: 'error',
                statusCode: 403,
                message: '로그인되어 있지 않습니다!',
            })
            .end(done);
    });
    it('작성자가 아니라면, 401 에러를 반환한다.', done => {
        agent
            .put('/posts/2')
            .send({ title: 'testtitle', content: 'testcontent' })
            .expect(401)
            .expect({ message: 'authenticate failed' })
            .end(done);
    });
    it('작성자라면, update ok 메세지를 반환한다.', done => {
        agent
            .put('/posts/1')
            .send({ title: 'testtitle', content: 'testcontent' })
            .expect(200)
            .expect({
                message: 'update ok',
            })
            .end(done);
    });
});

describe('DELETE /posts/:id', () => {
    const agent = request.agent(app);
    beforeEach(done => {
        agent
            .post('/users/login')
            .send({
                email: 'user1@example.com',
                password: 'password1',
            })
            .end(done);
    });
    it('로그인되어 있지 않다면, 에러를 반환한다.', done => {
        request(app)
            .delete('/posts/1')
            .expect(403)
            .expect({
                status: 'error',
                statusCode: 403,
                message: '로그인되어 있지 않습니다!',
            })
            .end(done);
    });
    it('작성자가 아니라면, 0을 반환한다.', done => {
        agent
            .delete('/posts/2')
            .expect(401)
            .expect({ message: 'authenticate failed' })
            .end(done);
    });

    it('작성자라면, delete ok 메세지를 반환한다.', done => {
        agent
            .delete('/posts/1')
            .expect(200)
            .expect({ message: 'delete ok' })
            .end(done);
    });
});

afterAll(async () => {
    await Post.create({
        id: 1,
        title: 'Post 1',
        user_id: 1,
    });
});
