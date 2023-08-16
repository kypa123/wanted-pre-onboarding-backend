import { validatePassword, validateEmail } from '../utils/useful_functions.ts';
import { Request, Response, NextFunction } from 'express';
import { TokenRequest } from '../interfaces/jwt-token-validation.ts';
async function validateUserinfo(
    req: Request | TokenRequest,
    res: Response,
    next: NextFunction,
) {
    const userInfo = req.body;
    const validatePasswordResult = validatePassword(userInfo.password);
    const validateEmailResult = validateEmail(userInfo.email);
    if (validatePasswordResult && validateEmailResult) {
        next();
    } else {
        if (!validateEmailResult) {
            res.status(401).json({ message: 'email validation error' });
        }
        if (validateEmailResult && !validatePasswordResult) {
            res.status(401).json({ message: 'password validation error' });
        }
    }
}

export default validateUserinfo;
