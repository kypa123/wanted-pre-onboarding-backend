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

Credential.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasOne(Credential, { foreignKey: 'user_id' });
export default Credential;
