import { DataTypes } from 'sequelize';
import { sequelize } from '../index.ts';
import User from './user.ts';

const Credential = sequelize.define('Credential', {
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Credential.belongsTo(User);
User.hasOne(Credential);
export default Credential;
