import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index.ts';
import Post from './post.ts';
import PostContentAttributes from '../../interfaces/post-content-attributes.ts';

const PostContent = sequelize.define<Model<PostContentAttributes>>('Post', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    post_id: {
        type: DataTypes.INTEGER,
    },
});

PostContent.belongsTo(Post);
Post.hasOne(PostContent);

export default PostContent;
