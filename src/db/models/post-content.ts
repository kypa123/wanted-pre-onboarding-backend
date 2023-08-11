import { DataTypes } from 'sequelize';
import { sequelize } from '../index.ts';
import Post from './post.ts';

const PostContent = sequelize.define('Post', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

PostContent.belongsTo(Post);
Post.hasOne(PostContent);

export default PostContent;
