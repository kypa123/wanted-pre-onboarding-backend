import { DataTypes, Model } from 'sequelize';
import sequelize from '../../connection.ts';
import UserAttributes from '../../interfaces/user-attributes.ts';

const User = sequelize.define<Model<UserAttributes>>('User', {
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
});

export default User;
