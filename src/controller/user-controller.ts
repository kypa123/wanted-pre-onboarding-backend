import { Request, Response } from 'express';
import { UserServiceInstance } from '../services/index.ts';
import { TokenRequest } from '../interfaces/jwt-token-validation.ts';

export async function addUser(req: Request, res: Response) {
    const userData = req.body;
    const result = await UserServiceInstance.addUser(userData);
    if (result.message == 'error') {
        res.status(401).json(result);
    } else {
        res.json(result);
    }
}
export async function deleteUser(req: TokenRequest, res: Response) {
    const userInfo = req.tokenInfo;
    const result = await UserServiceInstance.deleteUser(userInfo.id);
    res.clearCookie('token').json(result);
}

export async function login(req: Request, res: Response) {
    const userInfo = req.body;
    const result = await UserServiceInstance.login(userInfo);
    if (result.message == 'validationError') {
        res.status(401).json(result);
    } else {
        res.cookie('token', result.body).status(200).json(result);
    }
}
export async function logout(req: Request, res: Response) {
    res.clearCookie('token').json({ message: 'logout ok' });
}
