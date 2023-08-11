import { DataTypes } from 'sequelize';
import { sequelize } from '../index.ts';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    refreshToken: {
        type: DataTypes.STRING,
    },
});

export default User;
