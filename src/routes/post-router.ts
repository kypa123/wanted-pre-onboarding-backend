import { Router } from 'express';
import { isLoggedIn, asyncHandler } from '../middlewares/index.ts';
import * as postController from '../controller/post-controller.ts';
export default class PostRouter {
    private router: Router;
    constructor() {
        this.router = Router();

        this.router.get('/', asyncHandler(postController.getPostsByOffset));
        this.router.get('/id', asyncHandler(postController.getPostById));
        this.router.post('/', isLoggedIn, asyncHandler(postController.addPost));

        this.router.put('/', isLoggedIn, postController.updatePost);
        this.router.delete(
            '/',
            isLoggedIn,
            asyncHandler(postController.deletePost),
        );
    }
    getRouter() {
        return this.router;
    }
}
