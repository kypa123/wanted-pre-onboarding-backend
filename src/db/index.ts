import sequelize from './connection.ts';

import Credential from './models/credential.ts';
import PostContent from './models/post-content.ts';
import Post from './models/post.ts';
import User from './models/user.ts';

export { sequelize, Credential, Post, PostContent, User };
