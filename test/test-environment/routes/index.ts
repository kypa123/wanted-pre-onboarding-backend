import PostRouter from './post-router.ts';
import UserRouter from './user-router.ts';

const UserRouterInstance = new UserRouter();
const PostRouterInstance = new PostRouter();

export { PostRouterInstance, UserRouterInstance };
