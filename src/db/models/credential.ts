import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index.ts';
import CredentialAttributes from '../../interfaces/credential-attributes.ts';
import User from './user.ts';

const Credential = sequelize.define<Model<CredentialAttributes>>('Credential', {
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
});

Credential.belongsTo(User);
User.hasOne(Credential, { onDelete: 'CASCADE' });
export default Credential;
