import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index.ts';
import PostAttributes from '../../interfaces/post-attributes.ts';

import User from './user.ts';

const Post = sequelize.define<Model<PostAttributes>>('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
});

Post.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Post, { foreignKey: 'user_id' });

export default Post;
