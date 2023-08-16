import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(process.env.TEST_DB_CONNECTION);

export default sequelize;
