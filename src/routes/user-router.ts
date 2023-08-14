import { Router } from 'express';
import { isLoggedIn, asyncHandler } from '../middlewares/index.ts';
import { UserController } from '../controller/index.ts';
export default class UserRouter {
    private router: Router;
    private userController: UserController;
    constructor(userController: UserController) {
        this.router = Router();
        this.userController = userController;

        this.router.post('/login', asyncHandler(this.userController.login));
        this.router.post(
            '/logout',
            isLoggedIn,
            asyncHandler(this.userController.logout),
        );
        this.router.post('/', asyncHandler(this.userController.addUser));
        this.router.delete(
            '/',
            isLoggedIn,
            asyncHandler(this.userController.deleteUser),
        );
    }

    getRouter() {
        return this.router;
    }
}
