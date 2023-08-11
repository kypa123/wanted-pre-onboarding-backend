import * as dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT,
    dbConn: process.env.DB_CONNECTION,
    jwtSecret: process.env.JWT_SECRET_KEY,
    jwtExpire: process.env.JWT_EXPIRE_DATE,
    dataAPI: process.env.DATA_API,
};
