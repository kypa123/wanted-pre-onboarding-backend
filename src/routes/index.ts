import PostRouter from './post-router.ts';
import UserRouter from './user-router.ts';
import { UserController, PostController } from '../controller/index.ts';
import { UserService, PostService } from '../services/index.ts';
import { User, Post, Credential, PostContent, sequelize } from '../db/index.ts';
import { createRouterInstance } from '../utils/useful_functions.ts';
const UserRouterInstance = createRouterInstance(
    UserRouter,
    UserController,
    UserService,
    [User, Credential, sequelize],
);

const PostRouterInstance = createRouterInstance(
    PostRouter,
    PostController,
    PostService,
    [Post, PostContent, sequelize],
);

export { PostRouter, UserRouter, PostRouterInstance, UserRouterInstance };
