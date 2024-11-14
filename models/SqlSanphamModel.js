import { DataTypes } from "sequelize";
import sequelizeConnection from "../services/sequelizeDB";
import Nhom from "./SqlNhomModel";

const SanPham = sequelizeConnection.define('SanPham', {
    masp: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ten: {
        type: DataTypes.STRING,
        
    },
    gia: {
        type: DataTypes.INTEGER,
    },
    hinhanh: {
        type: DataTypes.STRING,
    },
    mota: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
    tableName: 'sanpham',
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
});

Nhom.hasMany(SanPham, { foreignKey: 'idnhom' });
SanPham.belongsTo(Nhom, { foreignKey: 'idnhom' });

Nhom.sync();
SanPham.sync();

export default SanPham;