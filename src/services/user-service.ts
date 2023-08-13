import { Sequelize } from 'sequelize';
import { User, Credential } from '../db/index.ts';
import { validateEmail, validatePassword } from '../utils/useful_functions.ts';
import config from '../config/index.ts';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class UserService {
    private UserModel: typeof User;
    private CredentialModel: typeof Credential;
    private SequelizeInstance: Sequelize;

    constructor(
        user: typeof User,
        credential: typeof Credential,
        sequelize: Sequelize,
    ) {
        this.UserModel = user;
        this.CredentialModel = credential;
        this.SequelizeInstance = sequelize;
    }

    async addUser(userData: { email: string; password: string }) {
        if (
            !(
                validateEmail(userData.email) &&
                validatePassword(userData.password)
            )
        ) {
            return { message: 'validationError' };
        }

        const transaction = await this.SequelizeInstance.transaction();
        try {
            const user = (await this.UserModel.create({
                email: userData.email,
            })) as any;
            const credential = await this.CredentialModel.create({
                user_id: user.id,
                password: bcrypt.hash(userData.password),
            });
            await transaction.commit();
            return { user, credential };
        } catch (err) {
            await transaction.rollback();
            return err;
        }
    }
    async deleteUser(userId: number) {
        return await this.UserModel.destroy({
            where: {
                id: userId,
            },
        });
    }

    async login(userInfo: { email: string; password: string }) {
        const result = (await this.UserModel.findOne({
            where: {
                email: userInfo.password,
            },
            include: [this.CredentialModel],
        })) as any;

        const validatePassword = await bcrypt.compare(
            result.password,
            userInfo.password,
        );
        if (validatePassword) {
            const jwtToken = await jwt.sign(
                result,
                config.jwtSecret || 'secret-key',
                {
                    expiresIn: config.jwtExpire,
                },
            );
            return jwtToken;
        } else {
            return { message: 'validationError' };
        }
    }
}
