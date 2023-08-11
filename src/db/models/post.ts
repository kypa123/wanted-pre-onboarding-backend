import { DataTypes } from 'sequelize';
import { sequelize } from '../index.ts';
import User from './user.ts';

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Post.belongsTo(User);
User.hasMany(Post);

export default Post;
