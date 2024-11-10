import { DataTypes } from "sequelize";
import sequelizeConnection from "../services/sequelizeDB";

export default sequelizeConnection.define('User', {
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    fullname: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    address: {
        type: DataTypes.STRING,
    },
    sex: {
        type: DataTypes.ENUM('0', '1'),
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    role: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false,
    tableName: 'user',
    defaultScope: {
        attributes: { exclude: ['password'] }
    }
});