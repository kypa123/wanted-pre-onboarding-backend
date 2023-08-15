import { Router } from 'express';
import { isLoggedIn, asyncHandler } from '../middlewares/index.ts';
import * as userController from '../controller/user-controller.ts';
export default class UserRouter {
    private router: Router;
    constructor() {
        this.router = Router();

        this.router.post('/login', asyncHandler(userController.login));
        this.router.post(
            '/logout',
            isLoggedIn,
            asyncHandler(userController.logout),
        );
        this.router.post('/', asyncHandler(userController.addUser));
        this.router.delete(
            '/',
            isLoggedIn,
            asyncHandler(userController.deleteUser),
        );
    }

    getRouter() {
        return this.router;
    }
}
