import { Router } from 'express';
import { isLoggedIn, asyncHandler } from '../middlewares/index.ts';
import { PostController } from '../controller/index.ts';
export default class PostRouter {
    private router: Router;
    private postController: PostController;
    constructor(postController: PostController) {
        this.router = Router();
        this.postController = postController;

        this.router.get(
            '/',
            asyncHandler(this.postController.getPostsByOffset),
        );
        this.router.get('/id', asyncHandler(this.postController.getPostById));
        this.router.post(
            '/',
            isLoggedIn,
            asyncHandler(this.postController.addPost),
        );

        this.router.put('/', isLoggedIn, this.postController.updatePost);
        this.router.delete(
            '/',
            isLoggedIn,
            asyncHandler(this.postController.deletePost),
        );
    }
}
