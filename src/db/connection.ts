import { Sequelize } from 'sequelize';
import config from '../config/index.ts';

const sequelize = new Sequelize(config.dbConn);
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

export default sequelize;
