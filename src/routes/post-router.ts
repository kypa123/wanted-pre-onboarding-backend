import { Router } from 'express';
import { isLoggedIn, asyncHandler } from '../middlewares/index.ts';
import * as postController from '../controller/post-controller.ts';
export default class PostRouter {
    private router: Router;
    constructor() {
        this.router = Router();

        this.router.get(
            '/:offset',
            asyncHandler(postController.getPostsByOffset),
        );
        this.router.get('/id/:id', asyncHandler(postController.getPostById));
        this.router.post('/', isLoggedIn, asyncHandler(postController.addPost));

        this.router.put('/:id', isLoggedIn, postController.updatePost);
        this.router.delete(
            '/:id',
            isLoggedIn,
            asyncHandler(postController.deletePost),
        );
    }
    getRouter() {
        return this.router;
    }
}
