import { Request, Response } from 'express';
import UserService from '../services/user-service.ts';
import { TokenRequest } from '../interfaces/jwt-token-validation.ts';

export default class UserController {
    private userService: UserService;
    constructor(UserService: UserService) {
        this.userService = UserService;
    }

    async addUser(req: Request, res: Response) {
        const userData = req.body;
        const result = await this.userService.addUser(userData);
        if (result.message == 'validationError') {
            res.status(401).json(result);
        } else {
            res.json(result);
        }
    }
    async deleteUser(req: TokenRequest, res: Response) {
        const userInfo = req.tokenInfo;
        const result = await this.userService.deleteUser(userInfo.id);
        res.clearCookie('token').json(result);
    }

    async login(req: Request, res: Response) {
        const userInfo = req.body;
        const result = await this.userService.login(userInfo);
        if (result.message == 'validationError') {
            res.status(401).json(result);
        } else {
            res.cookie('token', result.body).status(200).json(result);
        }
    }
    async logout(req: Request, res: Response) {
        res.clearCookie('token').json({ message: 'logout ok' });
    }
}
