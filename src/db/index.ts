import { Sequelize } from 'sequelize';
import config from '../config/index.ts';
import Credential from './models/credential.ts';
import PostContent from './models/post-content.ts';
import Post from './models/post.ts';
import User from './models/user.ts';

const sequelize = new Sequelize(config.dbConn);

export { sequelize, Credential, Post, PostContent, User };
