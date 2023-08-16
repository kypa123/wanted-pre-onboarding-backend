import { Sequelize } from 'sequelize';
import { User, Credential } from '../db/index.ts';
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
        const transaction = await this.SequelizeInstance.transaction();
        try {
            const user = (await this.UserModel.create(
                {
                    email: userData.email,
                },
                { transaction },
            )) as any;
            try {
                const password = await bcrypt.hash(userData.password, 10);
                const credential = await this.CredentialModel.create(
                    {
                        user_id: user.id,
                        password,
                    },
                    { transaction },
                );
                await transaction.commit();
                return { user, credential };
            } catch (err) {
                await transaction.rollback();
                console.log(err);
                return { message: 'error', step: 'credential', err };
            }
        } catch (err) {
            await transaction.rollback();
            return { message: 'error', step: 'user', err };
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
                email: userInfo.email,
            },
            include: [this.CredentialModel],
        })) as any;

        const validatePassword = await bcrypt.compare(
            userInfo.password,
            result.Credential.password,
        );
        if (validatePassword) {
            const jwtToken = await jwt.sign({ id: result.id }, 'secret-key', {
                expiresIn: '10m',
            });
            return { message: 'success', jwtToken };
        } else {
            return { message: 'validationError' };
        }
    }
}
