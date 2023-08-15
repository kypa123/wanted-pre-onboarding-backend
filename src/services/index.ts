import PostService from './post-service.ts';
import UserService from './user-service.ts';
import { Post, PostContent, User, Credential, sequelize } from '../db/index.ts';

const PostServiceInstance = new PostService(Post, PostContent, sequelize);
const UserServiceInstance = new UserService(User, Credential, sequelize);

sequelize.sync();
export { PostService, UserService, PostServiceInstance, UserServiceInstance };
