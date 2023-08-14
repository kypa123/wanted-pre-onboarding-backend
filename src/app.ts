import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { errorHandler } from './middlewares/index.ts';
import { UserRouterInstance, PostRouterInstance } from './routes/index.ts';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', UserRouterInstance.getRouter());
app.use('/posts', PostRouterInstance.getRouter());
//존재하지 않는 라우팅이라면 404, 이외의 에러는 errorHandler로
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(errorHandler);

export default app;
