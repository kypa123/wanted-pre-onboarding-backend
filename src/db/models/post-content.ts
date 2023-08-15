import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index.ts';
import Post from './post.ts';
import PostContentAttributes from '../../interfaces/post-content-attributes.ts';

const PostContent = sequelize.define<Model<PostContentAttributes>>(
    'PostContent',
    {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
        },
    },
);

PostContent.belongsTo(Post, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Post.hasOne(PostContent, { foreignKey: 'user_id' });

export default PostContent;
