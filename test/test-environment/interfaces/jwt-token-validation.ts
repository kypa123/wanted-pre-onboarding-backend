import jwt from 'jsonwebtoken';
import { Request } from 'express';

export interface UserToken extends jwt.JwtPayload {
    id: number;
    email: string;
}

export interface TokenRequest extends Request {
    tokenInfo: UserToken;
}
