import { DataTypes } from "sequelize";
import sequelizeConnection from "../services/sequelizeDB";

const Nhom = sequelizeConnection.define('Nhom', {
    idnhom: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ten: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false,
    tableName: 'nhom',
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
});

export default Nhom;